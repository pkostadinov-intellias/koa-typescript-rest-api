import * as _ from "lodash";

export const taskValidationSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    title: { type: "string" },
    description: { type: "string" },
    status: { enum: ["pending", "in-progress", "completed"] },
    ownerId: { type: "string", format: "uuid" }
  },
  additionalProperties: false,
  required: ["id", "title", "status", "ownerId"]
};

export const createTaskValidationSchema = {
  ...taskValidationSchema,
  properties: _.omit(taskValidationSchema.properties, ["id"]),
  required: ["title", "status", "ownerId"]
};
