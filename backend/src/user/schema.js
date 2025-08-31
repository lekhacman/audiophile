import { usernameSchema } from "./userSchema.js";

export const paramsSchema = {
  type: "object",
  properties: {
    id: usernameSchema,
  },
};
