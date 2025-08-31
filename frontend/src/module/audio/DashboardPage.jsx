import { list } from "../../api/assetApi.js";
import { Link, useLoaderData } from "react-router";
import Page from "../layout/Page.jsx";

export default function DashboardPage() {
  const assets = useLoaderData();
  return (
    <Page>
      <div>
        <h1>Dashboard</h1>
        <section>
          <Link to="/upload-audio">Upload new file</Link>
        </section>
        <section>
          <h2>Audio list</h2>
          <ul>
            {assets.map((asset) => (
              <li key={asset.fileId}>
                <Link to={`/audio/${asset.fileId}`}>{asset.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Page>
  );
}
DashboardPage.loader = list;
