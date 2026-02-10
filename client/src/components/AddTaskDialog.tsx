import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plus, Loader2, AlertTriangle } from "lucide-react";
import { useCreateTask } from "@/hooks/use-tasks";
import { insertTaskSchema } from "@shared/schema";

const formSchema = insertTaskSchema.extend({
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  effort: z.coerce.number().min(1).max(5),
  deadline: z.coerce.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const createTask = useCreateTask();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      duration: 30,
      effort: 3,
      status: "todo",
      isHighEffort: false,
    },
  });

  // Calculate if the task is high effort dynamically for UX feedback
  const effortValue = form.watch("effort");
  const durationValue = form.watch("duration");
  const isHighImpact = effortValue >= 4 || durationValue >= 120;

  function onSubmit(data: FormValues) {
    createTask.mutate(
      {
        ...data,
        isHighEffort: data.effort >= 4,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 font-semibold gap-2">
          <Plus className="w-5 h-5" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Add New Task</DialogTitle>
          <DialogDescription>
            Create a task to track your productivity.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">Task Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Review Q4 Marketing Plan" 
                      className="h-12 rounded-xl border-border/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 font-medium">Duration (min)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl border-border/60">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 font-medium">Deadline (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="datetime-local" 
                        className="h-12 rounded-xl border-border/60"
                        {...field}
                        value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="effort"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-foreground/80 font-medium">Effort Score (1-5)</FormLabel>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      Level {field.value}
                    </span>
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="py-4"
                    />
                  </FormControl>
                  <div className="flex justify-between text-xs text-muted-foreground px-1">
                    <span>Quick</span>
                    <span>Intense</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isHighImpact && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 items-start animate-in fade-in slide-in-from-top-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-amber-900">High Workload Impact</h4>
                  <p className="text-xs text-amber-700 mt-1">
                    This task requires significant mental energy. Consider scheduling a break afterwards.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-xl h-11">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createTask.isPending}
                className="rounded-xl h-11 px-8 font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              >
                {createTask.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                  </>
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
