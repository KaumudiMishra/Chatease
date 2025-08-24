import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import './queries.css';
import PageHeader from '../components/PageHeader';

export default function Queries() {
  const [tab, setTab] = useState("all");
  const [unanswered, setUnanswered] = useState([]);
  const [firebaseAnswers, setFirebaseAnswers] = useState([]);
  const [gptAnswers, setGptAnswers] = useState([]);

  useEffect(() => {
    const loadData = (path, setter) => {
      onValue(ref(db, `queries/${path}`), (snap) => {
        const data = snap.val();
        const list = data ? Object.values(data) : [];
        list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setter(list);
      });
    };

    loadData("unanswered", setUnanswered);
    loadData("answeredFromFirebase", setFirebaseAnswers);
    loadData("answeredFromGPT", setGptAnswers);
  }, []);

  const formatTime = (ts) => (ts ? new Date(ts).toLocaleString() : "-");

  const unansweredCombined = [
    ...unanswered.map((q) => ({ ...q, source: "unanswered" })),
    ...gptAnswers.map((q) => ({ ...q, source: "gpt" })),
  ].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const allCombined = [
    ...unansweredCombined.map((q) => ({ ...q, type: q.source })),
    ...firebaseAnswers.map((q) => ({ ...q, type: "firebase" })),
  ].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const renderTable = (items, type) => {
    const now = new Date().toLocaleString();
    let exampleRow = null;

    if (type === "unanswered") {
      exampleRow = (
        <tr className="example-row">
          <td>{now}</td>
          <td>Does PIET have a swimming pool?</td>
          <td>gpt</td>
          <td>Sorry, I couldn’t find that information.</td>
        </tr>
      );
    } else if (type === "firebase") {
      exampleRow = (
        <tr className="example-row">
          <td>{now}</td>
          <td>What is the admission process at PIET?</td>
          <td>Admissions at PIET are conducted through REAP based on JEE or 12th marks...</td>
        </tr>
      );
    } else if (type === "all") {
      exampleRow = (
        <tr className="example-row">
          <td>{now}</td>
          <td>When was PIET established?</td>
          <td>firebase</td>
          <td>PIET was established in 2007...</td>
        </tr>
      );
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Question</th>
            {type === "all" && <th>Type</th>}
            {type === "unanswered" && <th>Source</th>}
            {(type === "unanswered" || type === "firebase" || type === "all") && <th>Answer</th>}
          </tr>
        </thead>
        <tbody>
          {exampleRow}
          {items.map((item, i) => (
            <tr key={i}>
              <td>{formatTime(item.timestamp)}</td>
              <td>{item.question}</td>
              {type === "all" && <td>{item.type}</td>}
              {type === "unanswered" && <td>{item.source}</td>}
              {(type === "unanswered" || type === "firebase" || type === "all") && (
                <td>{item.answer || item.botReply || "-"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="queries-container">
      <PageHeader
        icon="🧾"
        title="User Queries"
        subtitle="View all user questions and improve chatbot coverage."
      />

      <div className="tab-buttons">
        <button onClick={() => setTab("all")} className={tab === "all" ? "active" : ""}>📋 All</button>
        <button onClick={() => setTab("unanswered")} className={tab === "unanswered" ? "active" : ""}>❌ Unanswered</button>
        <button onClick={() => setTab("firebase")} className={tab === "firebase" ? "active" : ""}>✅ Firebase Answers</button>
      </div>

      <div className="query-section">
        {tab === "unanswered" && renderTable(unansweredCombined, "unanswered")}
        {tab === "firebase" && renderTable(firebaseAnswers, "firebase")}
        {tab === "all" && renderTable(allCombined, "all")}
      </div>
    </div>
  );
}
