import { TaskPriority } from "@prisma/client";

export type TaskData = {
  title: string;
  description?: string;
  dueDate: string;
  priority: TaskPriority;
};

const baseApp = process.env.NEXT_PUBLIC_APP || "";

async function handleResponse(res: Response, action: string) {
  if (!res.ok) {
    const errorText = await res.text();
    console.error(
      `[${action}] Failed - Status: ${res.status} | Message: ${errorText}`,
    );
    throw new Error(`${action} failed. ${res.statusText}`);
  }

  try {
    return await res.json();
  } catch (err) {
    console.error(`[${action}] Error parsing JSON response`, err);
    throw new Error(`${action} failed. Invalid JSON response.`);
  }
}

export async function fetchTasks() {
  try {
    const res = await fetch(`${baseApp}/api/tasks`);
    const data = await handleResponse(res, "Fetch tasks");

    if (!Array.isArray(data)) {
      console.warn("Fetch tasks returned invalid data structure");
      return [];
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

export async function createTask(taskData: TaskData) {
  try {
    const res = await fetch(`${baseApp}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    console.log("🚀 ~ createTask ~ res:", res);

    return await handleResponse(res, "Create task");
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error; // Optional: Or return a fallback object/null
  }
}

export async function updateTask(taskId: string, taskData: TaskData) {
  if (!taskId) {
    throw new Error("Task ID is required to update a task");
  }

  try {
    const res = await fetch(`${baseApp}/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    return await handleResponse(res, "Update task");
  } catch (error) {
    console.error(`Failed to update task [${taskId}]:`, error);
    throw error;
  }
}

export async function deleteTask(taskId: string) {
  console.log("🚀 ~ deleteTask ~ taskId:", taskId)
  if (!taskId) {
    throw new Error("Task ID is required to delete a task");
  }

  try {
    const res = await fetch(`${baseApp}/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    return await handleResponse(res, "Delete task");
  } catch (error) {
    console.error(`Failed to delete task [${taskId}]:`, error);
    throw error;
  }
}
