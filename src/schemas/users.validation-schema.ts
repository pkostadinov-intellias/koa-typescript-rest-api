import * as _ from "lodash";

export const userValidationSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    email: { type: "string", format: "email" },
    name: { type: "string" },
    password: { type: "string" }
  },
  additionalProperties: false
};

export const createUserValidationSchema = {
  ...userValidationSchema,
  required: ["email", "name", "password"]
};
