import { Sidebar } from "@/components/Sidebar";
import { WorkloadChart } from "@/components/WorkloadChart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useInsights } from "@/hooks/use-insights";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import { BrainCircuit, TrendingUp, AlertOctagon } from "lucide-react";

const effortData = [
  { name: 'Light', value: 30, color: '#4ade80' },
  { name: 'Moderate', value: 45, color: '#fbbf24' },
  { name: 'High', value: 25, color: '#f87171' },
];

export default function Insights() {
  const { data: insights, isLoading } = useInsights();

  // Filter insights by type
  const behavioralInsights = insights?.filter(i => i.type === 'behavior') || [];
  const alerts = insights?.filter(i => i.type === 'alert') || [];

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 md:p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Insights & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Understand your work patterns and optimize productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
          <WorkloadChart />
          
          <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Effort Distribution</CardTitle>
              <CardDescription>Breakdown of tasks by mental effort level</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={effortData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {effortData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              Behavioral Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Static examples if API empty */}
              <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100 hover:border-indigo-200 transition-colors">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-indigo-900">Deep Work Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-indigo-800/80 leading-relaxed">
                    You are most productive between 9 AM and 11 AM. Schedule your high-effort tasks during this window for maximum efficiency.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 hover:border-emerald-200 transition-colors">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-emerald-900">Task Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-emerald-800/80 leading-relaxed">
                    You've completed 85% of planned tasks this week, which is 10% higher than your monthly average. Great consistency!
                  </p>
                </CardContent>
              </Card>

              {behavioralInsights.map(insight => (
                <Card key={insight.id} className="bg-secondary/30">
                  <CardHeader>
                    <CardTitle className="text-base">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-amber-500" />
              Recent Alerts
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 flex gap-3 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-amber-900">High Burnout Risk</h4>
                  <p className="text-xs text-amber-800 mt-1">
                    Detected 3 consecutive days with &gt;5 hours of high-effort tasks.
                  </p>
                  <p className="text-[10px] text-amber-600 mt-2 font-medium">2 hours ago</p>
                </div>
              </div>
              
              <div className="p-4 rounded-xl border border-border bg-card flex gap-3 items-start opacity-70">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Deadline Approaching</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    "Q3 Report" is due in less than 2 hours.
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-2 font-medium">Yesterday</p>
                </div>
              </div>

              {alerts.map(alert => (
                <div key={alert.id} className="p-4 rounded-xl border border-border bg-card">
                  <h4 className="font-semibold text-sm">{alert.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
