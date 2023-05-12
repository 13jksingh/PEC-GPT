import { createTheme, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import { useMemo } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./scenes/Login";
import Signup from "./scenes/Signup";
import Landing from "./scenes/Landing";
import ErrorPage from "./scenes/Error";

import ManuDashboard from "./scenes/Manu/ManuDashboard";
import ManuCatalaog from "./scenes/Manu/ManuCatalog";
import ManuHistory from "./scenes/Manu/ManuHistory";
import ManuPart from "./scenes/Manu/ManuPart";
import ManuRoot from "./scenes/Manu/ManuRoot";

import RecCatalog from "./scenes/Rec/RecCatalog";
import RecHistory from "./scenes/Rec/RecHistory";
import RecPart from "./scenes/Rec/RecPart";
import RecDashboard from "./scenes/Rec/RecDashboard";
import RecRoot from "./scenes/Rec/RecRoot";

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
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={isAuth ? <Navigate to={pathName} /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuth ? <Navigate to={pathName} /> : <Signup />}
        />
        <Route
          path="/manu"
          element={
            <RequireAuth>
              <ManuRoot />
            </RequireAuth>
          }
        >
          <Route path="" element={<ManuDashboard />} />
          <Route path="catalog" element={<ManuCatalaog />} />
          <Route path="history" element={<ManuHistory />} />
          <Route path="part" element={<ManuPart/>}/>
        </Route>
        
        <Route
          path="/rec"
          element={
            <RequireAuth>
              <RecRoot />
            </RequireAuth>
          }
        >
          <Route path="" element={<RecDashboard />} />
          <Route path="catalog" element={<RecCatalog />} />
          <Route path="history" element={<RecHistory />} />
          <Route path="part" element={<RecPart/>}/>
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
