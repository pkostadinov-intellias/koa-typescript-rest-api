import * as _ from "lodash";

export const userValidationSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    email: { type: "string", format: "email" },
    name: { type: "string" },
    password: { type: "string" }
  },
  additionalProperties: false,
  required: ["id", "name"]
};

export const createUserValidationSchema = {
  ...userValidationSchema,
  properties: _.omit(userValidationSchema.properties, ["id"]),
  required: ["email", "name", "password"]
};
