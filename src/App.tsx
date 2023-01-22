import React from "react";
import { Provider } from "./mainApp/context/Provider";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppDemo } from "./demoApp/AppDemo";
import { AppMain } from "./mainApp/AppMain";

export const App = () => {
  return (
    <>
      <Provider>
        <Routes>
          <Route path="/app/*" element={<AppMain />} />
          <Route path="/demo/*" element={<AppDemo />} />
          <Route path="*" element={<Navigate replace to="app" />} />
        </Routes>
      </Provider>
    </>
  );
};
