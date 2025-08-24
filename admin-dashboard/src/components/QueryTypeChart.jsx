// ✅ Final QueryTypeChart.jsx (No visible category labels, show on hover only)
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
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

export default function QueryTypeChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const rootRef = ref(db);
    onValue(rootRef, (snap) => {
      const allData = snap.val();
      const formatted = [];

      if (allData) {
        Object.entries(allData).forEach(([categoryName, values]) => {
          const subCount = typeof values === 'object' ? Object.keys(values).length : 0;
          formatted.push({ name: categoryName, value: subCount });
        });
      }

      setData(formatted);
    });
  }, []);

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <div style={{ width: `${data.length * 60}px`, minWidth: "100%" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
