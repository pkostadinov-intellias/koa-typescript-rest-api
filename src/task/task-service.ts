import { Repository } from "../db/repository";
import { Task } from "./task";

const taskRepository = new Repository<Task>("tasks");

export const getAllTasks = async () => {
  return taskRepository.find();
};

export const getTaskById = async (id: string) => {
  return taskRepository.findById(id);
};

export const getTasksByUserId = async (userId: string) => {
  const tasksByUserId = (await taskRepository.find()).filter(
    (task) => task.ownerId === userId
  );

  return tasksByUserId;
};

export const createTask = async (task: Task) => {
  if (!task.title) {
    throw new Error("Task title is required");
  }
  if (!task.ownerId) {
    throw new Error("Task must have an owner");
  }

  const newTask = {
    ...task,
    status: task.status || "pending"
  };

  return taskRepository.create(newTask);
};

export const updateTask = async (id: string, task: Partial<Task>) => {
  const existingTask = await taskRepository.findById(id);
  if (!existingTask) {
    return null;
  }
  return taskRepository.update(id, { ...existingTask, ...task });
};

export const deleteTask = async (id: string) => {
  const existingTask = await taskRepository.findById(id);
  if (!existingTask) {
    return null;
  }
  await taskRepository.delete(id);
  return existingTask;
};
