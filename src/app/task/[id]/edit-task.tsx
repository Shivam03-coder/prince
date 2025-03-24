// components/EditTaskModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function EditTaskModal({ trigger, task }: { trigger: React.ReactNode, task: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task: {task.title}</DialogTitle>
        </DialogHeader>
        {/* Replace below with actual form inputs */}
        <div className="space-y-4">
          <p>Description: {task.description}</p>
          <p>Priority: {task.priority}</p>
          <Button>Edit (Fake)</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
