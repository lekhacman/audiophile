import assetRepository from "./assetRepository.js";
import {map, pickBy} from "ramda";

export default function listAsset(req, res) {
  return assetRepository
    .findAllByOwnerId(req.user.username)
    .then(map(pickBy((val, key) => key !== "ownerId")))
    .then(res.send.bind(res));
}
