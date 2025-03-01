import * as fs from "node:fs";

export interface Entity {
  id: string;
  [key: string]: any;
}

export const storage = {
  map: new Map<string, Map<string, Entity>>(), // Stores tables and their respective entities

  async add(tableName: string, id: string, data: Entity): Promise<void> {
    if (!this.map.has(tableName)) {
      this.map.set(tableName, new Map<string, Entity>());
    }
    const table = this.map.get(tableName)!;

    if (table.has(id)) {
      throw new Error(
        `Entity with id ${id} already exists in table ${tableName}`
      );
    }

    table.set(id, data);
    await this.persist();
  },

  async update(tableName: string, id: string, data: Entity): Promise<void> {
    const table = this.map.get(tableName);
    if (!table || !table.has(id)) {
      throw new Error(`Entity with id ${id} not found in table ${tableName}`);
    }

    table.set(id, data);
    await this.persist();
  },

  async delete(tableName: string, id: string): Promise<void> {
    const table = this.map.get(tableName);
    if (table) {
      table.delete(id);
      await this.persist();
    }
  },

  async getAll(tableName: string): Promise<Entity[]> {
    const table = this.map.get(tableName);
    return table ? Array.from(table.values()) : [];
  },

  async getById(tableName: string, id: string): Promise<Entity | null> {
    if (!id) {
      throw new Error("ID must be provided");
    }
    const table = this.map.get(tableName);
    return table?.get(id) || null;
  },

  async getBy(
    tableName: string,
    propKey: string,
    propVal: any
  ): Promise<Entity | undefined> {
    const table = this.map.get(tableName);
    if (!table) return undefined;

    for (const item of table.values()) {
      if (item[propKey] === propVal) {
        return item;
      }
    }
    return undefined;
  },

  async persist(): Promise<void> {
    const dbObject: Record<string, Entity[]> = {};

    this.map.forEach((table, tableName) => {
      dbObject[tableName] = Array.from(table.values());
    });

    fs.writeFileSync("./db.json", JSON.stringify(dbObject, null, 2));
  }
};

export const init = (): void => {
  if (fs.existsSync("./db.json")) {
    try {
      const dataBuffer = fs.readFileSync("./db.json");
      const data = dataBuffer.toString();
      if (data.length > 0) {
        const parsedData: Record<string, Entity[]> = JSON.parse(data);

        Object.entries(parsedData).forEach(([tableName, entities]) => {
          const table = new Map<string, Entity>();
          entities.forEach((item) => {
            table.set(item.id, item);
          });
          storage.map.set(tableName, table);
        });
      }
    } catch (err) {
      console.error("DB init error", err);
    }
  }
};
