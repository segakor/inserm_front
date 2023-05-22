import React, { lazy, Suspense } from "react";
import { Provider } from "./mainApp/context/Provider";
import { Routes, Route, Navigate } from "react-router-dom";

export const App = () => {
  const AppMain = lazy(() => import("./mainApp"));
  const AppDemo = lazy(() => import("./demoApp"));

  return (
    <>
      <Provider>
        <Routes>
          <Route
            path="/app/*"
            element={
              <Suspense>
                <AppMain />
              </Suspense>
            }
          />
          <Route
            path="/demo/*"
            element={
              <Suspense>
                <AppDemo />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate replace to="app" />} />
        </Routes>
      </Provider>
    </>
  );
};
