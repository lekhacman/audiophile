import { Outlet } from "react-router";
import AuthProvider from "./module/auth/AuthProvider.jsx";

export default function Root() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
