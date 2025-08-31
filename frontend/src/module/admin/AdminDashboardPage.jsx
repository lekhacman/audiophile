import { userApi } from "../../api";
import { Link, useLoaderData, useNavigate } from "react-router";
import { remove } from "../../api/userApi.js";
import Page from "../layout/Page.jsx";

export default function AdminDashboardPage() {
  const { users } = useLoaderData();
  const navigate = useNavigate();
  function handleRemoveUser(username) {
    return function removeUser() {
      return remove(username).then(() => navigate("/admin"));
    };
  }
  const thisUser = JSON.parse(localStorage.getItem("user"));
  return (
    <Page>
      <div>
        <h1>Admin Dashboard</h1>

        <div>
          <Link to="/create-user">Create a new user</Link>
          <h2>User list</h2>
          <ul>
            {users.map(({ username }) => (
              <li key={username}>
                {username} <Link to={`/user/${username}`}>Edit</Link>
                {thisUser.username !== username && (
                  <>
                    {" "}
                    |{" "}
                    <button onClick={handleRemoveUser(username)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}
AdminDashboardPage.loader = async function () {
  return { users: await userApi.list() };
};
