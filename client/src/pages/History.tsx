import { Sidebar } from "@/components/Sidebar";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { format } from "date-fns";
import { CheckCircle2, Clock, CalendarDays } from "lucide-react";

// Custom styles for DayPicker to match theme
const css = `
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: #3B82F6;
    --rdp-background-color: #eff6ff;
    margin: 0;
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #f3f4f6;
  }
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
    background-color: #3B82F6;
    color: white;
  }
`;

export default function History() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <style>{css}</style>
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 md:p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">History</h1>
          <p className="text-muted-foreground mt-1">
            Review your past performance and task logs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-4 border-border/50 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-primary" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center p-6">
              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                showOutsideDays
                className="p-4 bg-white rounded-xl border border-border/50"
              />
            </CardContent>
          </Card>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card rounded-xl border border-border/50 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
                <span>Summary for {date ? format(date, "MMMM do, yyyy") : "Selected Date"}</span>
                {date && <span className="text-sm font-normal text-muted-foreground bg-secondary px-3 py-1 rounded-full">Completed</span>}
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">8</div>
                  <div className="text-xs font-semibold text-blue-800/70 uppercase tracking-wide mt-1">Tasks Completed</div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">92%</div>
                  <div className="text-xs font-semibold text-green-800/70 uppercase tracking-wide mt-1">Efficiency</div>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600">4.5h</div>
                  <div className="text-xs font-semibold text-purple-800/70 uppercase tracking-wide mt-1">Focus Time</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Task Log</h3>
                
                {/* Mock historical data */}
                {[
                  { title: "Review Q4 Marketing Strategy", time: "09:00 AM", duration: "60m", status: "completed" },
                  { title: "Team Sync", time: "10:30 AM", duration: "30m", status: "completed" },
                  { title: "Client Presentation Prep", time: "11:15 AM", duration: "90m", status: "completed" },
                  { title: "Email Correspondence", time: "02:00 PM", duration: "45m", status: "completed" },
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/20 border border-transparent hover:border-border transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{task.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background px-2 py-1 rounded-md border border-border/50">
                        <Clock className="w-3 h-3" />
                        {task.time} • {task.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
