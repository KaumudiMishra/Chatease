// src/components/DailyUserChart.jsx
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function DailyUserChart() {
  const [lineData, setLineData] = useState([]);

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

      const formatted = Object.entries(dailyUsers).map(([date, users]) => ({
        date,
        users: users.size,
      })).sort((a, b) => new Date(a.date) - new Date(b.date));

      setLineData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
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
  );
}
