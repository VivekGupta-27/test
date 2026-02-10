import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Mock data for initial render
const data = [
  { day: "Mon", workload: 240, limit: 300 },
  { day: "Tue", workload: 180, limit: 300 },
  { day: "Wed", workload: 320, limit: 300 },
  { day: "Thu", workload: 290, limit: 300 },
  { day: "Fri", workload: 150, limit: 300 },
  { day: "Sat", workload: 120, limit: 300 },
  { day: "Sun", workload: 60, limit: 300 },
];

export function WorkloadChart() {
  return (
    <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Weekly Workload</CardTitle>
        <CardDescription>Minutes worked vs planned capacity</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#6b7280" }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#6b7280" }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="workload" 
              stroke="#3B82F6" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#3B82F6", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="limit" 
              stroke="#e5e7eb" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
