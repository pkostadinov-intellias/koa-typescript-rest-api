import * as crypto from "node:crypto";
import { Entity } from "./local";
import { db } from "./db";

export class Repository<T extends Entity> {
  private validateId(id: string): void {
    if (!id || typeof id !== "string" || id.trim() === "") {
      throw new Error("Invalid ID: ID must be a non-empty string.");
    }
  }

  async find(): Promise<T[]> {
    return (await db.storage.getAll()) as T[];
  }

  async findById(id: string): Promise<T | null> {
    this.validateId(id);
    return (await db.storage.getById(id)) as T | null;
  }

  async findByField<K extends keyof T>(
    field: K,
    value: T[K]
  ): Promise<T | null> {
    if (!field || value === undefined) {
      throw new Error(
        "Invalid field search: Both field and value are required."
      );
    }
    return (await db.storage.getBy(field as string, value)) as T | null;
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const entity = { ...data, id: crypto.randomUUID() } as T;

    await db.storage.add(entity.id, entity);
    return entity;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    this.validateId(id);

    const existingEntity = await this.findById(id);
    if (!existingEntity) {
      throw new Error(`Entity with ID ${id} not found.`);
    }

    const updatedEntity = { ...existingEntity, ...data };
    await db.storage.update(id, updatedEntity);
    return updatedEntity;
  }

  async delete(id: string): Promise<void> {
    this.validateId(id);

    const entity = await this.findById(id);
    if (!entity) {
      throw new Error(`Entity with ID ${id} not found.`);
    }

    await db.storage.delete(id);
  }
}
