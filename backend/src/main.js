import Fastify from "fastify";
import range from "fastify-range";
import cookie from "@fastify/cookie";
import multipart from "@fastify/multipart";
import health from "./health.js";
import createRoot from "./user/createRoot.js";
import getAsset from "./asset/getAsset.js";
import createUser from "./user/createUser.js";
import login from "./authentication/login.js";
import authenticate from "./authentication/authenticate.js";
import { USER_ROLE } from "./user/userRepository.js";
import listUser from "./user/listUser.js";
import updateUser from "./user/updateUser.js";
import removeUser from "./user/removeUser.js";
import listAsset from "./asset/listAsset.js";
import uploadAsset from "./asset/uploadAsset.js";
import getAssetBlob from "./asset/getAssetBlob.js";
import getAssetInfo from "./asset/getAssetInfo.js";
import getUser from "./user/getUser.js";

const fastify = Fastify({ logger: true, bodyLimit: 50e6 });

fastify.register(range);
fastify.register(cookie);
fastify.register(multipart);

fastify.get("/v1/health", health);
fastify.post("/v1/bootstrap", createRoot.options, createRoot);
fastify.post("/v1/login", login.options, login);

// ----- User management -----
fastify.post(
  "/v1/user",
  createUser.options,
  authenticate(createUser, { role: USER_ROLE.ADMIN }),
);
fastify.post(
  "/v1/user/:id",
  updateUser.options,
  authenticate(updateUser, { role: USER_ROLE.ADMIN }),
);
fastify.delete(
  "/v1/user/:id",
  removeUser.options,
  authenticate(removeUser, { role: USER_ROLE.ADMIN }),
);
fastify.get(
  "/v1/user",
  listUser.options,
  authenticate(listUser, { role: USER_ROLE.ADMIN }),
);
fastify.get("/v1/user/:id", getUser.options, authenticate(getUser));
// ----- End of User management -----

// ----- Asset management -----
fastify.get(
  "/v1/asset/:id/blob",
  getAssetBlob.options,
  authenticate(getAssetBlob),
);
fastify.get("/v2/asset/:id/blob", getAsset.options, authenticate(getAsset));
fastify.get(
  "/v1/asset/:id/info",
  getAssetInfo.options,
  authenticate(getAssetInfo),
);
fastify.get("/v1/asset", authenticate(listAsset));
fastify.post("/v1/asset", authenticate(uploadAsset));
// ----- End of Asset management -----

fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
