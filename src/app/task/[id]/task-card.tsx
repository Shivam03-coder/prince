// components/TaskCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil, Star } from "lucide-react"
import EditTaskModal from "./edit-task"

interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  status: "Completed" | "In Progress" | "Pending"
  priority: "Low" | "Medium" | "High"
  assignee: string
}

interface TaskCardProps {
  task: Task
  type: "modal" | "edit-delete"
  onDelete?: (id: number) => void
}

export default function TaskCard({ task, type, onDelete }: TaskCardProps) {
  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {task.title}
          <Badge
            variant={task.status === "Completed" ? "default" : "outline"}
            className={task.status === "Completed" ? "bg-green-500 text-white" : "text-gray-500"}
          >
            {task.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{task.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
          <Badge
            variant="secondary"
            className={`text-xs ${task.priority === "High" ? "bg-red-500 text-white" : task.priority === "Medium" ? "bg-yellow-500 text-black" : "bg-green-500 text-white"}`}
          >
            Priority: {task.priority}
          </Badge>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{task.assignee}</span>
          </div>

          {/* Action Buttons */}
          {type === "modal" && (
            <EditTaskModal
              task={task}
              trigger={
                <Button variant="outline" size="icon">
                  <Star className="w-4 h-4" />
                </Button>
              }
            />
          )}

          {type === "edit-delete" && (
            <div className="flex space-x-2">
              <EditTaskModal
                task={task}
                trigger={
                  <Button variant="outline" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                }
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete && onDelete(task.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
