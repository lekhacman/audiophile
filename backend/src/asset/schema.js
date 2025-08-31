export const paramsSchema = {
  type: "object",
  properties: {
    id: { type: "string", maxLength: 36, pattern: "[a-z0-9\\-]+" },
  },
};
