import { useCallback, useEffect, useMemo, useState } from "react";
import * as userApi from "../../api/userApi.js";
import AuthContext from "./AuthContext.jsx";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const storeUser = (username) => (user) => {
    const dto = { ...user, username };
    localStorage.setItem("user", JSON.stringify(dto));
    setUser(dto);
    return dto;
  };
  const login = useCallback(function (user) {
    return userApi.login(user).then(storeUser(user.username));
  }, []);
  const ctx = useMemo(
    () => ({
      user,
      login,
    }),
    [user, login],
  );
  useEffect(function rehydrateUser() {
    if (user && location.pathname !== "/") {
      userApi.getUser(user.username).then(storeUser(user.username));
    }
  }, []);
  return <AuthContext value={ctx}>{children}</AuthContext>;
}
