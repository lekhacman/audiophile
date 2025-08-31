import LoginForm from "./LoginForm.jsx";
import { bootstrapApi } from "../../api/index.js";
import { useNavigate } from "react-router";
import { login, USER_ROLE } from "../../api/userApi.js";

export default function CreateRootUser() {
  const navigate = useNavigate();
  function bootstrap(data) {
    return bootstrapApi(data)
      .then(login)
      .then(() => {
        localStorage.setItem("role", USER_ROLE.ADMIN);
        navigate("/admin");
      });
  }
  return (
    <div>
      <h2>Create an admin account</h2>
      <div>
        <LoginForm handleSubmit={bootstrap} />
      </div>
    </div>
  );
}
