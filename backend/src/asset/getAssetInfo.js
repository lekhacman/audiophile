import { paramsSchema } from "./schema.js";
import assetRepository from "./assetRepository.js";
import AssetId from "./AssetId.js";

export default async function getAssetInfo(req, res) {
  /** @type Asset */
  const asset = await assetRepository.get(
    new AssetId(req.user.username, req.params.id).toString(),
  );
  if (!asset) {
    return res.status(404).send();
  }
  return res.send(asset);
}
getAssetInfo.options = { schema: { params: paramsSchema } };
