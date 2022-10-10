import React from "react";
import { LoginPage } from "./components/LoginPage";
import { Provider } from "./context/Provider";
import { Page } from "./components/Page"


const App: React.FC = () => {


  return (
    <Provider>
      {/* <LoginPage /> */}
      <Page />
    </Provider>
  );
};

export default App;
