import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { ref, onValue, set, remove } from "firebase/database";
import PageHeader from "../components/PageHeader";
import intentMap from "../config/intentmap.js";
import axios from "axios";
import "./messagelog.css";

export default function MessageLog() {
  const [logs, setLogs] = useState({});
  const [summaries, setSummaries] = useState({});
  const [blockedUsers, setBlockedUsers] = useState({});

  useEffect(() => {
    const logsRef = ref(db, "logs");
    onValue(logsRef, (snapshot) => {
      setLogs(snapshot.val() || {});
    });

    const blockRef = ref(db, "blocked_users");
    onValue(blockRef, (snapshot) => {
      setBlockedUsers(snapshot.val() || {});
    });
  }, []);

  useEffect(() => {
    const apiKey = "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";

    Object.entries(logs).forEach(async ([phone, messages]) => {
      const sortedMessages = Object.values(messages).sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      const userText = sortedMessages
        .filter((log) => log.sender === "user")
        .map((log) => log.message)
        .join("\n");

      if (!userText.trim()) return;

      const prompt = `Summarize in one short line what the user wants to know about the college based only on their messages. Only include college-related queries like admission, fees, courses, hostel, placements, faculty, exams, etc. Ignore all irrelevant or off-topic queries like jokes, food, brands, weather, etc.\n\n${userText}`;

      try {
        const res = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "mistralai/mistral-7b-instruct",
            messages: [{ role: "user", content: prompt }],
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:5173",
            },
          }
        );

        const summary = res.data.choices[0]?.message?.content || "No summary available.";
        setSummaries((prev) => ({
          ...prev,
          [phone.replace("whatsapp:", "")]: { summary },
        }));
      } catch (err) {
        console.error("AI summary fetch failed for", phone, err);
      }
    });
  }, [logs]);

  function extractKeywordsFromMessages(text) {
    const lowerText = text.toLowerCase();
    const matched = new Set();

    for (const [intent, phrases] of Object.entries(intentMap)) {
      for (const phrase of phrases) {
        if (lowerText.includes(phrase.toLowerCase())) {
          matched.add(intent);
          break;
        }
      }
    }

    return Array.from(matched).sort();
  }

  const downloadGroupedCSV = () => {
    const grouped = {};
    Object.entries(logs).forEach(([phone, messages]) => {
      const userMessages = Object.values(messages).filter((log) => log.sender === "user");
      const cleanedPhone = phone.replace("whatsapp:", "").trim();
      if (!grouped[cleanedPhone]) grouped[cleanedPhone] = [];
      userMessages.forEach((msg) => grouped[cleanedPhone].push(msg.message));
    });

    const csvRows = [["Phone", "Keyword Summary", "AI Summary"]];
    for (const [phone, messages] of Object.entries(grouped)) {
      const allText = messages.join(" ");
      const keywords = extractKeywordsFromMessages(allText);
      const formatted = keywords.map((k) => `• ${k}`).join(" | ");
      const aiSummary = summaries[phone]?.summary || "";
      csvRows.push([`${phone}`, `"${formatted}"`, `"${aiSummary.replace(/"/g, '""')}"`]);
    }

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "keyword_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleBlock = (phone) => {
    const clean = phone.replace("whatsapp:", "");
    const refPath = ref(db, `blocked_users/${clean}`);
    if (blockedUsers[clean]) {
      remove(refPath);
    } else {
      set(refPath, true);
    }
  };

  // 📌 Sort phone numbers based on latest message timestamp (desc)
  const sortedLogEntries = Object.entries(logs).sort((a, b) => {
    const lastA = Math.max(
      ...Object.values(a[1]).map((msg) => new Date(msg.timestamp).getTime())
    );
    const lastB = Math.max(
      ...Object.values(b[1]).map((msg) => new Date(msg.timestamp).getTime())
    );
    return lastB - lastA; // Latest first
  });

  return (
    <div className="message-log-container">
      <PageHeader
        icon="💬"
        title="Message Logs"
        subtitle="Track user conversations and manage blocked numbers with ease."
      />
      <button className="csv-download-btn" onClick={downloadGroupedCSV}>
        📥 Download CSV
      </button>

      {sortedLogEntries.map(([phone, messages]) => {
        const sortedMessages = Object.values(messages)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // latest message on top
        const userMessages = sortedMessages
          .filter((log) => log.sender === "user")
          .map((log) => log.message)
          .join(" ");
        const cleanPhone = phone.replace("whatsapp:", "");
        const aiSummary = summaries[cleanPhone]?.summary;

        const keywords = extractKeywordsFromMessages(userMessages);

        return (
          <div key={phone} className="chat-box">
            <div className="chat-header">
              {phone}
              <button
                style={{
                  marginLeft: "auto",
                  background: blockedUsers[cleanPhone] ? "#f87171" : "#34d399",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
                onClick={() => toggleBlock(phone)}
              >
                {blockedUsers[cleanPhone] ? "Unblock" : "Block"}
              </button>
            </div>

            <div className="chat-scroll">
              {sortedMessages.map((log, idx) => (
                <div
                  key={idx}
                  className={`chat-bubble ${log.sender === "user" ? "user-msg" : "bot-msg"}`}
                >
                  <div className="msg-meta">{new Date(log.timestamp).toLocaleString()}</div>
                  <strong>{log.sender === "user" ? "🧍 User" : "🤖 Bot"}:</strong> {log.message}
                </div>
              ))}
            </div>

            {aiSummary && (
              <div className="chat-summary">
                <strong>🧠 AI Summary:</strong>
                <div>{aiSummary}</div>
              </div>
            )}

            {keywords.length > 0 && (
              <div className="chat-summary">
                <strong>🔍 Keyword Summary:</strong>
                <ul>{keywords.map((k, i) => <li key={i}>• {k}</li>)}</ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
