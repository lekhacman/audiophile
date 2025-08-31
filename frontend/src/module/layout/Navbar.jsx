import "./Navbar.css";
import { useAuthContext } from "../auth/AuthContext.jsx";
import { USER_ROLE as UserRole } from "../../api/userApi.js";
import { NavLink } from "react-router";

export default function Navbar() {
  const authCtx = useAuthContext();
  const links = [
    { path: "/", label: "Home" },
    ...(authCtx.user
      ? authCtx.user.role === UserRole.ADMIN
        ? [{ path: "/admin", label: "Dashboard" }]
        : [{ path: "/dashboard", label: "Dashboard" }]
      : []),
  ];
  return (
    <nav>
      <ul className="navbar">
        {links.map(({ path, label }) => (
          <li key={path}>
            <NavLink to={path}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
