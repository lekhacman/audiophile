import http from "./http.js";
import { object, string } from "yup";

/**
 * @readonly
 * @enum {string}
 */
export const USER_ROLE = {
  ADMIN: "admin",
  USER: "user",
};

/**
 * @typedef {object} User
 * @property {string} username
 * @property {string} password
 * @property {USER_ROLE} role
 */
const username = string().min(1).max(32).required();
const password = string().min(1).max(128).required();
const role = string().oneOf(Object.values(USER_ROLE));

export const createUserRequest = object({ username, password, role });

/**
 * @param {User} user
 * @return {Promise<void>}
 */
export function create(user) {
  return http.post("/v1/user", user);
}

export const updateUserRequest = object({ password, role });

/**
 * @param {User} user
 * @return {Promise<void>}
 */
export function update(user) {
  return http.post(`/v1/user/${user.username}`, user);
}

/**
 * @param {string} username
 * @return {Promise<void>}
 */
export function remove(username) {
  return http.delete(`/v1/user/${username}`);
}

/**
 * @return {Promise<Array<User>>}
 */
export function list() {
  return http.get("/v1/user");
}

export const loginRequest = object({ username, password }).required();

/**
 * @param {Omit<User, "role">} user
 * @return {Promise<{role: USER_ROLE}>}
 */
export function login(user) {
  return http.post("/v1/login", user);
}

/**
 * @param {string} username
 * @return {Promise<User>}
 */
export function getUser(username) {
  return http.get(`/v1/user/${username}`);
}
