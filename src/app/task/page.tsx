"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, Flag, Trash2, Edit } from "lucide-react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  TaskData,
} from "@/lib/api";
import { TaskPriority } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { useAppToasts } from "@/hooks/use-app-taost";
import { UserButton, UserProfile } from "@clerk/nextjs";

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

type Task = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  userId: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();
  const { ErrorToast, SuccessToast } = useAppToasts();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
      ErrorToast({
        title: "Error loading tasks. Please try again later.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const taskData: TaskData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        dueDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
        priority: formData.get("priority") as TaskPriority,
      };

      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        SuccessToast({
          title: "Task updated successfully.",
        });
      } else {
        await createTask(taskData);
        SuccessToast({
          title: "Task created successfully.",
        });
      }

      await loadTasks();
      setIsCreateOpen(false);
      setEditingTask(null);
      setSelectedDate(undefined);
    } catch (error) {
      console.error("Failed to save task:", error);
      ErrorToast({
        title: "Failed to save task. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      SuccessToast({
        title: "Task deleted successfully.",
      });
      await loadTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
      ErrorToast({
        title: "Failed to delete task. Please try again.",
      });
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setSelectedDate(task.dueDate ? new Date(task.dueDate) : undefined);
    setIsCreateOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      HIGH: "text-red-500 dark:text-red-400",
      MEDIUM: "text-yellow-500 dark:text-yellow-400",
      LOW: "text-green-500 dark:text-green-400",
    };
    return colors[priority as keyof typeof colors] ?? "text-gray-500";
  };

  const getPriorityBadgeColor = (priority: string) => {
    const colors = {
      HIGH: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      MEDIUM:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      LOW: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    };
    return (
      colors[priority as keyof typeof colors] ?? "bg-gray-100 text-gray-700"
    );
  };

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="border-white border p-3">
            <h1 className="text-4xl font-bold text-white">
              SMART PLAN MANAGER
            </h1>
          </div>

          <div className="flex items-center gap-x-3">
            <UserButton />
            <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <SheetTrigger asChild>
                <Button
                  size="lg"
                  className="flex items-center gap-2 rounded-[5px] bg-blue-300 text-black transition"
                >
                  <PlusCircle className="h-5 w-5" />
                  Create Task
                </Button>
              </SheetTrigger>

              <SheetContent className="my-auto mr-7 h-[95%] w-[400px] rounded-xl border border-white bg-black text-white">
                <SheetHeader>
                  <SheetTitle>
                    {editingTask ? "Edit Task" : "Create New Task"}
                  </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      name="title"
                      defaultValue={editingTask?.title}
                      placeholder="Enter task title"
                      required
                      className="rounded-xl border-white bg-gray-900 text-white placeholder-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      name="description"
                      defaultValue={editingTask?.description || ""}
                      placeholder="Enter task description"
                      className="min-h-[100px] rounded-xl border-white bg-gray-900 text-white placeholder-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Due Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start rounded-[5px] bg-white text-left font-normal text-black hover:bg-gray-200`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto border-white bg-black p-0 text-white">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select
                      name="priority"
                      defaultValue={editingTask?.priority || "MEDIUM"}
                    >
                      <SelectTrigger className="rounded-[5px] bg-white text-black hover:bg-gray-200">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="border-white bg-black text-white">
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-[5px] bg-white text-black hover:bg-gray-200"
                    disabled={isLoading || !selectedDate}
                  >
                    {isLoading
                      ? "Saving..."
                      : editingTask
                        ? "Update Task"
                        : "Create Task"}
                  </Button>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Card
                key={task.id}
                className="rounded-[5px] border border-white bg-black text-white transition-shadow hover:shadow-lg"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{task.title}</CardTitle>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityBadgeColor(task.priority)}`}
                    >
                      {task.priority.toLowerCase()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(task)}
                      className="rounded-[5px] text-white hover:bg-white hover:text-black"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(task.id)}
                      className="rounded-[5px] text-red-500 hover:bg-white hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="min-h-[2.5rem] text-gray-400">
                    {task.description || "No description"}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {task.dueDate
                        ? format(new Date(task.dueDate), "MMM dd, yyyy")
                        : "No due date"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-white/10 p-4">
              <PlusCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-white">No tasks yet</h2>
            <p className="max-w-sm text-gray-400">
              Create your first task to get started with managing your work
              efficiently.
            </p>
            <Button
              size="lg"
              onClick={() => setIsCreateOpen(true)}
              className="mt-4 rounded-[5px] bg-white text-black hover:bg-gray-200"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Your First Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
