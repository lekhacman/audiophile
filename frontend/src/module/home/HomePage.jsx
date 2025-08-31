import { getSystemHealth } from "../../api";
import { useLoaderData } from "react-router";
import CreateRootUser from "../auth/CreateRootUser.jsx";
import Page from "../layout/Page.jsx";
import Login from "../auth/Login.jsx";

export default function HomePage() {
  const { msg, pristine } = useLoaderData();
  return (
    <Page>
      <div>
        <h1>Audiophile</h1>
        <p>System is {msg}</p>
        {pristine ? <CreateRootUser /> : <Login />}
      </div>
    </Page>
  );
}

HomePage.loader = function () {
  return getSystemHealth();
};
