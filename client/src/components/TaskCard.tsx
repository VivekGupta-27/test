import { Task } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const isCompleted = task.status === "completed";

  const toggleStatus = () => {
    updateTask.mutate({
      id: task.id,
      status: isCompleted ? "todo" : "completed"
    });
  };

  const getEffortColor = (effort: number) => {
    if (effort >= 4) return "bg-red-50 text-red-700 border-red-100";
    if (effort === 3) return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-green-50 text-green-700 border-green-100";
  };

  return (
    <div 
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-white/60 transition-all duration-200",
        isCompleted && "opacity-60"
      )}
    >
      <button 
        onClick={toggleStatus}
        disabled={updateTask.isPending}
        className="shrink-0 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
      >
        {isCompleted ? (
          <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-50" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className={cn("font-medium text-sm truncate", isCompleted && "line-through text-muted-foreground")}>
          {task.title}
        </h3>
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{task.duration} min</span>
          </div>
          {task.deadline && (
            <span className="text-xs text-muted-foreground">
              Due {format(new Date(task.deadline), "h:mm a")}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="outline" className={cn("text-[10px] font-semibold h-6", getEffortColor(task.effort))}>
          Effort {task.effort}
        </Badge>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={() => deleteTask.mutate(task.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
