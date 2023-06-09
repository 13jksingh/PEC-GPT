import { createTheme, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import { useMemo } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./scenes/Login";
import Signup from "./scenes/Signup";
import Landing from "./scenes/Landing";
import ErrorPage from "./scenes/Error";
import NewPart from "./scenes/NewPart";
import PartPage from "./scenes/PartPage";
import Root from "./scenes/Root";
import Settings from "./scenes/Settings";

import ManuDashboard from "./scenes/Manu/ManuDashboard";
import ManuCatalaog from "./scenes/Manu/ManuCatalog";
import ManuHistory from "./scenes/Manu/ManuHistory";

import RecCatalog from "./scenes/Rec/RecCatalog";
import RecHistory from "./scenes/Rec/RecHistory";
import RecDashboard from "./scenes/Rec/RecDashboard";

import AeroCatalog from "./scenes/Aero/AeroCatalog";
import AeroDashboard from "./scenes/Aero/AeroDashboard";
import AeroHistory from "./scenes/Aero/AeroHistory";

import { useAuthContext, RequireAuth } from "./auth/authContext";

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  const authObject = useAuthContext();
  const isAuth = authObject.isAuth;

  //const userType = authObject.authState.type;

  //route to current page logic if logged in
  const location = useLocation();
  const pathName = location.state?.from || "/manu";
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={isAuth ? <Navigate to={pathName} /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuth ? <Navigate to={pathName} /> : <Signup />}
        />

        {/*manufacturer*/}

        <Route
          path="/manu"
          element={
            <RequireAuth type="manu">
              <Root type="manu" />
            </RequireAuth>
          }
        >
          <Route path="" element={<Landing/>} />
          <Route path="catalog" element={<ManuCatalaog />} />
          <Route path="catalog/part" element={<PartPage />} />
          <Route path="history" element={<ManuHistory />} />
          <Route path="addnew" element={<NewPart />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/*recycle*/}
        <Route
          path="/rec"
          element={
            <RequireAuth type="rec">
              <Root type="aero" />
            </RequireAuth>
          }
        >
          <Route path="" element={<Landing />} />
          <Route path="catalog" element={<RecCatalog />} />
          <Route path="catalog/part" element={<PartPage />} />
          <Route path="history" element={<RecHistory />} />
          <Route path="addnew" element={<NewPart />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/*airline*/}
        <Route
          path="/aero"
          element={
            <RequireAuth type="aero">
              <Root type="aero" />
            </RequireAuth>
          }
        >
          <Route path="" element={<Landing />} />
          <Route path="catalog" element={<AeroCatalog />} />
          <Route path="catalog/part" element={<PartPage />} />
          <Route path="history" element={<AeroHistory />} />
          <Route path="addnew" element={<NewPart />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
