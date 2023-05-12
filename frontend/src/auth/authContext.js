import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const intialAuth = {
  isAuth: null,
  authState: sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : null,
  loginHandler: (email, password) => {},
  logoutHandler: () => {},
};

const AuthContext = createContext(intialAuth);

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(intialAuth.authState);

  const isAuth = authState === null ? false : true;

  const loginHandler = (token) => {
    //console.log(token);
    setAuthState(token);
    sessionStorage.setItem("token", JSON.stringify(token));
  };
  const logoutHandler = () => {
    setAuthState(null);
    sessionStorage.removeItem("token");
  };

  const authObject = {
    isAuth,
    authState,
    loginHandler,
    logoutHandler,
  };

  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
};

const RequireAuth = ({ children ,type}) => {
  const location = useLocation();
  const authObject = useAuthContext();

  if (!authObject.isAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  if (type === "manu" && authObject.authState.userType === "Recycler") {
    return <Navigate to="/rec" state={{ from: location.pathname }} />;
  }

  if (type === "rec" && authObject.authState.userType !== "Recycler") {
    return <Navigate to="/manu" state={{ from: location.pathname }} />;
  }
  
  return <>{children}</>;
};

export { useAuthContext, AuthProvider, RequireAuth };
