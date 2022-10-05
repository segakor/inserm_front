import React from "react";
import { LoginPage } from "./components/LoginPage";
import { Provider } from "./context/Provider";


const App: React.FC = () => {


  return (
    <Provider>
      <LoginPage />
    </Provider>
  );
};

export default App;
