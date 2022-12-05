import { createReducer } from "@reduxjs/toolkit";
import { LocalState } from "./types";
import {
  SetPersonInfo,
  SetClientProject,
  SET_PERSON_INFO,
  SET_CLIENT_PROJECT,
} from "./action";

export const initialState: LocalState = {
  personInfo: undefined,
  clientProject: undefined,
  role: undefined,
};

function setPersonInfo(
  state: LocalState,
  { payload }: SetPersonInfo
): LocalState {
  return {
    ...state,
    personInfo: payload,
  };
}

function setClientProject(
  state: LocalState,
  { payload }: SetClientProject
): LocalState {
  return {
    ...state,
    clientProject: payload,
  };
}

export const reducer = createReducer(initialState, {
  [SET_PERSON_INFO]: setPersonInfo,
  [SET_CLIENT_PROJECT]: setClientProject,
});
