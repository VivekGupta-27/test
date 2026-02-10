import { Sidebar } from "@/components/Sidebar";
import { useTasks } from "@/hooks/use-tasks";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { TaskCard } from "@/components/TaskCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckSquare } from "lucide-react";

export default function TasksPage() {
  const { data: tasks, isLoading } = useTasks();

  const todoTasks = tasks?.filter(t => t.status === "todo") || [];
  const completedTasks = tasks?.filter(t => t.status === "completed") || [];

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">All Tasks</h1>
            <p className="text-muted-foreground mt-1">Manage your complete task list.</p>
          </div>
          <AddTaskDialog />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 bg-secondary/50 p-1 rounded-xl h-11">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">All Tasks</TabsTrigger>
            <TabsTrigger value="todo" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">To Do</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Completed</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <>
                <TabsContent value="all" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {tasks?.length === 0 ? (
                     <EmptyState />
                  ) : (
                    tasks?.map(task => <TaskCard key={task.id} task={task} />)
                  )}
                </TabsContent>
                
                <TabsContent value="todo" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {todoTasks.length === 0 ? (
                     <div className="text-center py-20 text-muted-foreground">No pending tasks! Great job.</div>
                  ) : (
                    todoTasks.map(task => <TaskCard key={task.id} task={task} />)
                  )}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {completedTasks.length === 0 ? (
                     <div className="text-center py-20 text-muted-foreground">No completed tasks yet.</div>
                  ) : (
                    completedTasks.map(task => <TaskCard key={task.id} task={task} />)
                  )}
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border/60 rounded-2xl bg-secondary/10">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
        <CheckSquare className="w-8 h-8 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">No tasks found</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm text-center">
        Your task list is empty. Create a new task to get started with your day.
      </p>
    </div>
  );
}
