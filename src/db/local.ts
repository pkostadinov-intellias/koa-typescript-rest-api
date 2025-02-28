import * as fs from "node:fs";

export interface Entity {
  id: string;
  [key: string]: any;
}

export const storage = {
  map: new Map<string, Entity>(),

  async add(id: string, data: Entity): Promise<void> {
    if (this.map.has(id)) {
      throw new Error(`Entity with id ${id} exists`);
    }
    this.map.set(id, data);
    await this.persist();
  },

  async update(id: string, data: Entity): Promise<void> {
    this.map.set(id, data);
    await this.persist();
  },

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    await this.persist();
  },

  async getAll(): Promise<Entity[]> {
    return Array.from(this.map.values());
  },

  async getById(id: string): Promise<Entity | null> {
    if (!id) {
      throw new Error("ID must be provided");
    }
    return this.map.get(id) || null;
  },

  async getBy(propKey: string, propVal: any): Promise<Entity | undefined> {
    for (const item of this.map.values()) {
      if (item[propKey] === propVal) {
        return item;
      }
    }
    return undefined;
  },

  async persist(): Promise<void> {
    fs.writeFileSync("./db.json", JSON.stringify(await this.getAll(), null, 2));
  }
};

export const init = (): void => {
  if (fs.existsSync("./db.json")) {
    try {
      const dataBuffer = fs.readFileSync("./db.json");
      const data = dataBuffer.toString();
      if (data.length > 0) {
        const parsedData: Entity[] = JSON.parse(data);
        parsedData.forEach((item) => {
          storage.add(item.id, item);
        });
      }
    } catch (err) {
      console.error("DB init error", err);
    }
  }
};
