// src/components/IntentAccuracyChart.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export default function IntentAccuracyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const logsRef = ref(db, "logs");

    let correct = 0, fallback = 0;

    onValue(logsRef, (snapshot) => {
      const logs = snapshot.val();

      if (logs) {
        Object.values(logs).forEach((userMsgs) => {
          Object.values(userMsgs).forEach((msg) => {
            if (msg.intent === "fallback") fallback++;
            else correct++;
          });
        });

        setData([
          { type: "Correct", count: correct },
          { type: "Fallback", count: fallback },
        ]);
      }
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
