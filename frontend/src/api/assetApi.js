import http from "./http.js";

/**
 * @typedef {object} Asset
 * @property {string} id
 * @property {string} name
 * @property {string} mimeType
 */

/**
 * @return {Promise<Array<Asset>>}
 */
export function list() {
  return http.get("/v1/asset");
}

/**
 * @param {File} file
 * @return {Promise<void>}
 */
export function upload({ myfile, ...dto }) {
  const formData = Object.entries(dto).reduce((form, [key, value]) => {
    form.append(key, value);
    return form;
  }, new FormData());
  formData.append("file", myfile);

  return http.post("/v1/asset", formData);
}

/**
 * @param {string} id
 * @return {Promise<Omit<Asset, "id">>}
 */
export function getAssetInfo(id) {
  return http.get(`/v1/asset/${id}/info`);
}
