import http from "./http.js";
import { always } from "ramda";

/**
 * @param {Omit<User, "role">} user
 * @return {Promise<void>}
 */
export default function bootstrapApi(user) {
  return http.post("/v1/bootstrap", user).then(always(user));
}
