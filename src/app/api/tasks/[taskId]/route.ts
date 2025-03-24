import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { TaskPriority } from "@prisma/client";

// PUT /api/tasks/:taskId
export async function PUT(
  req: NextRequest,
  { params }: { params: { taskId: string } },
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const taskId = params.taskId;
  const body = await req.json();
  const { title, description, dueDate, priority } = body;

  try {
    const updatedTask = await db.task.update({
      where: { id: taskId, userId },
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        priority: priority as TaskPriority,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Failed to update task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
}

// DELETE /api/tasks/:taskId
export async function DELETE(
  req: NextRequest,
  { params }: { params: { taskId: string } },
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const taskId = params.taskId;

  if (!taskId) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  try {
    await db.task.delete({
      where: { id: taskId, userId },
    });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Failed to delete task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}
