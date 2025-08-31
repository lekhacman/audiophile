import http from "./http.js";

export default function getSystemHealth() {
  return http.get("/v1/health");
}
