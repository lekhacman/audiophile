import { createContext, useContext } from "react";
import { identity } from "ramda";

const AuthContext = createContext({ user: null, login: identity });
export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
