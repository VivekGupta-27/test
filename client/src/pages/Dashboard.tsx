import { useDailyStats } from "@/hooks/use-stats";
import { useTasks } from "@/hooks/use-tasks";
import { format } from "date-fns";
import { Sidebar } from "@/components/Sidebar";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { TaskCard } from "@/components/TaskCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Lightbulb, 
  TrendingUp, 
  AlertCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDailyStats();
  const { data: tasks, isLoading: tasksLoading } = useTasks();

  const today = new Date();
  
  // Computed values
  const todoTasks = tasks?.filter(t => t.status === "todo") || [];
  const completedTasks = tasks?.filter(t => t.status === "completed") || [];
  
  // Use mock data if API is empty/loading for better visual representation
  const progressPercent = stats 
    ? Math.min(Math.round((stats.totalMinutesCompleted / (stats.totalMinutesPlanned || 1)) * 100), 100) 
    : 0;

  const burnoutRisk = stats?.burnoutRisk || "Low";

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-8 space-y-8 overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome, Saloni
            </h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">
              {format(today, "EEEE, MMMM do, yyyy")}
            </p>
          </div>
          <AddTaskDialog />
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Workload Progress Card */}
          <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none shadow-xl shadow-blue-500/20">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-blue-100 font-medium text-sm mb-1">Today's Workload</h3>
                  <div className="text-3xl font-bold tracking-tight">
                    {stats?.totalMinutesCompleted || 0} <span className="text-blue-200 text-lg font-normal">/ {stats?.totalMinutesPlanned || 0} min</span>
                  </div>
                </div>
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="mt-8 space-y-2">
                <div className="flex justify-between text-xs font-medium text-blue-100">
                  <span>Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-2.5 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-blue-200 mt-2">
                  You're on track to complete your goals today.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Burnout Risk Card */}
          <Card className="border-border/50 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                Burnout Risk
                <AlertTriangle className={cn("w-4 h-4", burnoutRisk === "High" ? "text-red-500" : "text-amber-500")} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mt-1">
                <span className={cn(
                  "text-2xl font-bold",
                  burnoutRisk === "Low" ? "text-green-600" : 
                  burnoutRisk === "Medium" ? "text-amber-600" : "text-red-600"
                )}>
                  {burnoutRisk.toUpperCase()}
                </span>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                  burnoutRisk === "Low" ? "bg-green-50 text-green-700 border-green-100" : 
                  burnoutRisk === "Medium" ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-red-50 text-red-700 border-red-100"
                )}>
                  Stable
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Your workload distribution is balanced. Consider taking a 5m break after your next task.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Task List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Today's Tasks</h2>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{completedTasks.length}</span> / {tasks?.length || 0} completed
              </div>
            </div>

            <Card className="border-border/50 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm min-h-[400px]">
              <div className="divide-y divide-border/40">
                {tasksLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="p-4 flex gap-4">
                      <Skeleton className="w-6 h-6 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  ))
                ) : tasks && tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <p className="font-medium">No tasks yet</p>
                    <p className="text-sm">Create a task to get started.</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column: Insights & Summary */}
          <div className="space-y-6">
            {/* Key Insight */}
            <Card className="bg-amber-50/50 border-amber-100 shadow-sm">
              <CardContent className="p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 text-sm">Productivity Tip</h4>
                  <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                    You have 2 high-effort tasks scheduled back-to-back. Try interleaving a quick 15m task between them.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Daily Summary */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Daily Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 divide-x divide-y divide-border/40">
                  <div className="p-4 text-center hover:bg-secondary/30 transition-colors">
                    <div className="text-2xl font-bold text-foreground">{tasks?.length || 0}</div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mt-1">Due Today</div>
                  </div>
                  <div className="p-4 text-center hover:bg-secondary/30 transition-colors">
                    <div className="text-2xl font-bold text-red-500">{stats?.tasksOverdue || 0}</div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mt-1">Overdue</div>
                  </div>
                  <div className="p-4 text-center hover:bg-secondary/30 transition-colors">
                    <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mt-1">Completed</div>
                  </div>
                  <div className="p-4 text-center hover:bg-secondary/30 transition-colors">
                    <div className="text-2xl font-bold text-blue-600">{Math.round((stats?.totalMinutesCompleted || 0)/60 * 10) / 10}h</div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mt-1">Tracked</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Alert */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2">
                  {todoTasks.filter(t => t.deadline).slice(0, 3).map(task => (
                    <div key={task.id} className="flex justify-between items-center text-sm">
                      <span className="truncate max-w-[120px] text-muted-foreground">{task.title}</span>
                      <span className="font-medium text-xs bg-secondary px-2 py-1 rounded-md">
                        {format(new Date(task.deadline!), "h:mm a")}
                      </span>
                    </div>
                  ))}
                  {(!todoTasks.filter(t => t.deadline).length) && (
                    <p className="text-xs text-muted-foreground italic">No upcoming deadlines.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
