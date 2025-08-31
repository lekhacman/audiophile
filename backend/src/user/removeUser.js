import userRepository from "./userRepository.js";
import * as fileRepository from "../asset/fileRepository.js";
import assetRepository from "../asset/assetRepository.js";
import { paramsSchema } from "./schema.js";

export default async function removeUser(req, res) {
  if (req.user.username === req.params.id) {
    return res.status(400).send();
  }
  await Promise.all([
    userRepository.remove(req.params.id),
    assetRepository.removeAssets(req.params.id),
    fileRepository.remove(req.params.id),
  ]);
  return res.status(204).send();
}
removeUser.options = { schema: { params: paramsSchema } };
