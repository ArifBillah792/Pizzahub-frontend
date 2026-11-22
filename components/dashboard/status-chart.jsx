"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// the same colour always means the same thing
const COLOR_BY_NAME = {
  Pending: "#ffc94d",
  Approved: "#2f8f46",
  Accepted: "#2f8f46",
  Rejected: "#e63946",
  Cancelled: "#7a6253",
  Inactive: "#7a6253",
  Customer: "#e63946",
  Vendor: "#ffc94d",
  Admin: "#2f8f46",
};
const tooltipStyle = {
  background: "#1e1410",
  border: "1px solid #3a2a22",
  borderRadius: 12,
  color: "#fff3e6",
};

export function StatusChart({ title, data, type = "bar" }) {
  const hasData = data.some((d) => d.value > 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-4 font-bold">{title}</h2>
      {!hasData ? (
        <p className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          No data yet
        </p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {type === "pie" ? (
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {data.map((d) => (
                    <Cell
                      key={d.name}
                      fill={COLOR_BY_NAME[d.name] || "#e63946"}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: "#fff3e6" }}
                />
                <Legend />
              </PieChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid stroke="#3a2a22" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#c9b6a6"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  stroke="#c9b6a6"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: "#fff3e6" }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {data.map((d) => (
                    <Cell
                      key={d.name}
                      fill={COLOR_BY_NAME[d.name] || "#e63946"}
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
