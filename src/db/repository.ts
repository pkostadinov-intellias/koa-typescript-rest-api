import * as crypto from "node:crypto";
import { Entity } from "./local";
import { db } from "./db";

export class Repository<T extends Entity> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  private validateId(id: string): void {
    if (!id || typeof id !== "string" || id.trim() === "") {
      throw new Error("Invalid ID: ID must be a non-empty string.");
    }
  }

  async find(): Promise<T[]> {
    return (await db.storage.getAll(this.tableName)) as T[];
  }

  async findById(id: string): Promise<T | null> {
    this.validateId(id);
    return (await db.storage.getById(this.tableName, id)) as T | null;
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
    return (await db.storage.getBy(
      this.tableName,
      field as string,
      value
    )) as T | null;
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const entity = { ...data, id: crypto.randomUUID() } as T;
    await db.storage.add(this.tableName, entity.id, entity);
    return entity;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    this.validateId(id);

    const existingEntity = await this.findById(id);
    if (!existingEntity) {
      throw new Error(
        `Entity with ID ${id} not found in table ${this.tableName}.`
      );
    }

    const updatedEntity = { ...existingEntity, ...data };
    await db.storage.update(this.tableName, id, updatedEntity);
    return updatedEntity;
  }

  async delete(id: string): Promise<void> {
    this.validateId(id);

    const entity = await this.findById(id);
    if (!entity) {
      throw new Error(
        `Entity with ID ${id} not found in table ${this.tableName}.`
      );
    }

    await db.storage.delete(this.tableName, id);
  }
}
