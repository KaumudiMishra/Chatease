// src/components/HourlyTrafficChart.jsx
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
  CartesianGrid,
  Legend,
} from "recharts";

export default function HourlyTrafficChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const logsRef = ref(db, "logs");
    const hourCounts = Array(24).fill(0); // 0 to 23

    onValue(logsRef, (snapshot) => {
      const logs = snapshot.val();

      if (logs) {
        Object.values(logs).forEach((userMsgs) => {
          Object.values(userMsgs).forEach((msg) => {
            const hour = new Date(msg.timestamp).getHours();
            hourCounts[hour]++;
          });
        });

        const formatted = hourCounts.map((count, hour) => ({
          hour: `${hour}:00`,
          messages: count,
        }));

        setData(formatted);
      }
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="messages" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
