import { useContext } from "react";

import {
  ContextState,
  ContextDispatch,
} from "./Provider";

export const useDispatch = () => {
  const contextValue = useContext(ContextDispatch);

  if (contextValue === null) {
    throw new Error(
      "useDigitalSignDispatch must be used within a ContextDispatch"
    );
  }

  return contextValue;
};

export const useLocalState = () => {
  const contextValue = useContext(ContextState);
  if (contextValue === null) {
    throw new Error(
      "useLocalState must be used within a ContextState"
    );
  }

  return contextValue;
};
