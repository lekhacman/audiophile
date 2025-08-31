import { useState } from "react";
import { USER_ROLE } from "../../api/userApi.js";
import { useNavigate } from "react-router";
import LoginForm from "./LoginForm.jsx";
import { useAuthContext } from "./AuthContext.jsx";

const dashboardMap = {
  [USER_ROLE.ADMIN]: "/admin",
  [USER_ROLE.USER]: "/dashboard",
};

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuthContext();

  function handleLogin(dto) {
    return login(dto)
      .then(({ role }) => {
        navigate(dashboardMap[role]);
      })
      .catch(setErrorMessage);
  }
  return (
    <div>
      <h2>Login</h2>
      <LoginForm handleSubmit={handleLogin} />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
