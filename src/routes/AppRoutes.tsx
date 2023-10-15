import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { App } from "./App";
import { useAuth } from "../auth/Auth";

const AppRoutes: FC = () => {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          {currentUser ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<PublicRoutes />} />
              <Route index element={<Navigate to="/login" />} />
            </>
          )}
        </Route>
        <Route
          path="*"
          element={
            <>
              <p> 404 not found</p>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
