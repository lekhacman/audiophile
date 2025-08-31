import { paramsSchema } from "./schema.js";
import AssetId from "./AssetId.js";
import assetRepository from "./assetRepository.js";
import * as fileRepository from "./fileRepository.js";

export default async function getAssetBlob(req, res) {
  const assetId = new AssetId(req.user.username, req.params.id);
  const asset = await assetRepository.get(assetId.toString());
  if (!asset) {
    return res.status(404).send();
  }

  res.type(asset.mimeType);

  return fileRepository.readStream(assetId);
}
getAssetBlob.options = { schema: { params: paramsSchema } };
