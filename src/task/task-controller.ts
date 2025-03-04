import { Context } from "koa";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasksByUserId,
  updateTask
} from "./task-service";

export const getAllTasksController = async (ctx: Context) => {
  try {
    const tasks = await getAllTasks();
    ctx.body = tasks;
  } catch (error: any) {
    ctx.throw(error.status || 500, error.message || "Internal Server Error");
  }
};

export const getTaskByIdController = async (ctx: Context) => {
  const { id } = ctx.params;
  const task = await getTaskById(id);
  if (!task) {
    ctx.throw(404, `Task with ID ${id} not found`);
  }
  ctx.body = task;
};

export const getTasksByUserIdController = async (ctx: Context) => {
  const { userId } = ctx.params;
  const tasks = await getTasksByUserId(userId);
  if (!tasks.length) {
    ctx.throw(404, `User with id: ${userId}, doesn't have tasks`);
  }
  ctx.body = tasks;
};

export const createTaskController = async (ctx: Context) => {
  const taskData = ctx.request.body as any;
  const ownerId = ctx.state.user.id;
  const newTask = await createTask({ ...taskData, ownerId });
  ctx.status = 201;
  ctx.body = newTask;
};

export const updateTaskController = async (ctx: Context) => {
  const { id } = ctx.params;
  const taskData = ctx.request.body as any;
  const updatedTask = await updateTask(id, taskData);
  if (!updatedTask) {
    ctx.throw(404, `Task with ID ${id} not found`);
  }
  ctx.body = updatedTask;
};

export const deleteTaskController = async (ctx: Context) => {
  const { id } = ctx.params;
  const deleted = await deleteTask(id);
  if (!deleted) {
    ctx.throw(404, `Task with ID ${id} not found`);
  }
  ctx.status = 204;
};
