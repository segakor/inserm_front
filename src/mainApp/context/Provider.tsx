import React, {
  createContext,
  useReducer,
  Dispatch,
  ReactElement,
} from "react";

import { ReducerAction } from "./action";
import { reducer, initialState } from "./reducer";
import { LocalState } from "./types";

export const ContextState =
  createContext<LocalState | null>(null);
export const ContextDispatch =
  createContext<Dispatch<ReducerAction> | null>(null);

type Props = {
  children: ReactElement;
};

export const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <ContextState.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>
        {children}
      </ContextDispatch.Provider>
    </ContextState.Provider>
  );
};
