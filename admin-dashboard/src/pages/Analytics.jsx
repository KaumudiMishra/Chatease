import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import PageHeader from "../components/PageHeader";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import "./analytics.css";

export default function Analytics() {
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const COLORS = ["#00C49F", "#FF8042"];

  // 📈 Daily User Activity (Line Chart)
  useEffect(() => {
    const logsRef = ref(db, "logs");

    onValue(logsRef, (snapshot) => {
      const logs = snapshot.val();
      const dailyUsers = {};

      if (logs) {
        Object.entries(logs).forEach(([userPhone, messages]) => {
          Object.values(messages).forEach((msg) => {
            const date = new Date(msg.timestamp).toLocaleDateString("en-IN");
            if (!dailyUsers[date]) dailyUsers[date] = new Set();
            dailyUsers[date].add(userPhone);
          });
        });
      }

      const formatted = Object.entries(dailyUsers)
        .map(([date, users]) => ({
          date,
          users: users.size,
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setLineData(formatted);
    });
  }, []);

  // 🥧 Answered vs Fallback (Pie Chart)
  useEffect(() => {
    const logsRef = ref(db, "logs");

    onValue(logsRef, (snapshot) => {
      const logs = snapshot.val();

      let answeredCount = 0;
      let fallbackCount = 0;

      if (logs) {
        Object.values(logs).forEach((userMsgs) => {
          Object.values(userMsgs).forEach((msg) => {
            const answerText = msg.answer?.toLowerCase() || "";

            if (
              msg.intent === "fallback" ||
              answerText.includes("sorry") ||
              answerText.includes("not trained")
            ) {
              fallbackCount++;
            } else {
              answeredCount++;
            }
          });
        });
      }

      setPieData([
        { name: "Answered", value: answeredCount },
        { name: "Fallback", value: fallbackCount },
      ]);
    });
  }, []);

  return (
    <div className="analytics-container">
      <PageHeader
        icon="📅"
        title="Daily User Activity"
        subtitle="Visualize the number of users interacting with the chatbot each day."
      />
      <div className="chart-section">
        {lineData.length === 0 ? (
          <p>No user activity data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <CartesianGrid stroke="#ccc" />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6c63ff"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <PageHeader
        icon="📊"
        title="Answer Type Distribution"
        subtitle="Breakdown of responses by type to understand content engagement."
      />
      <div className="chart-section">
        {pieData.length === 0 ? (
          <p>No query data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
