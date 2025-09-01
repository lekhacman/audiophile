import { useLoaderData, useParams } from "react-router";
import { getAssetInfo } from "../../api/assetApi.js";
import Page from "../layout/Page.jsx";

export default function AudioPlayer() {
  const { id } = useParams();
  const assetInfo = useLoaderData();
  const src = `/api/v1/asset/${id}/blob`;
  return (
    <Page>
      <div>
        <h1>Audio player</h1>
        {/*<p>{assetInfo.mimeType}</p>*/}
        <p>Description: {assetInfo.description}</p>
        <p>Category: {assetInfo.category}</p>
        <div>
          <audio controls autoPlay={true} preload="auto" src={src}>
            <a href={`/api/v1/asset/${id}/blob`} download={`${id}.mp3`}>
              Download audio
            </a>
          </audio>
        </div>
      </div>
    </Page>
  );
}
AudioPlayer.loader = function ({ params }) {
  return getAssetInfo(params.id);
};
