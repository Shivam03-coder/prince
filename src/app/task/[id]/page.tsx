// // app/page.tsx
// "use client"

// import { useState } from "react"
// import TaskCard from "./task-card"

// export default function Home() {
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       title: "Design Landing Page",
//       description: "Create a responsive landing page for marketing.",
//       dueDate: "2025-04-01",
//       status: "In Progress",
//       priority: "High",
//       assignee: "Alice"
//     },
//     {
//       id: 2,
//       title: "Write Blog Post",
//       description: "Draft blog post on Prisma and Next.js integration.",
//       dueDate: "2025-04-05",
//       status: "Pending",
//       priority: "Medium",
//       assignee: "Bob"
//     },
//     {
//       id: 3,
//       title: "Fix Login Bug",
//       description: "Resolve issue with OAuth login on mobile devices.",
//       dueDate: "2025-03-30",
//       status: "Completed",
//       priority: "Low",
//       assignee: "Charlie"
//     }
//   ])

//   const handleDelete = (id: number) => {
//     setTasks(prev => prev.filter(task => task.id !== id))
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {/* First Card: Opens Modal */}
//       <TaskCard task={tasks[0]!} type="modal" />

//       {/* Second Card: Edit/Delete */}
//       <TaskCard task={tasks[1]} type="edit-delete" onDelete={handleDelete} />

//       {/* Third Card: Edit/Delete */}
//       <TaskCard task={tasks[2]} type="edit-delete" onDelete={handleDelete} />
//     </div>
//   )
// }
