import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Layout = lazy(() => import("../layouts/Layout"));
const Home = lazy(() => import("../pages/home/Home"));
const Favorites = lazy(() => import("../pages/home/Favorits"));

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/*" element={<Navigate to="/home" />} />
        <Route
          path="home"
          element={
            <Suspense
              fallback={
                <>
                  <p>Loading..</p>
                </>
              }
            >
              <Home />
            </Suspense>
          }
        />
        <Route
          path="favorits"
          element={
            <Suspense
              fallback={
                <>
                  <p>Loading..</p>
                </>
              }
            >
              <Favorites />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
