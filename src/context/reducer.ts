import { createReducer } from "@reduxjs/toolkit";
import { LocalState } from "./types";
import {
  SetPersonInfo,
  SetClientProject,
  SET_PERSON_INFO,
  SET_CLIENT_PROJECT,
  SetListOfAdmin,
  SET_LIST_OF_ADMIN,
  SetProjectForPayment,
  SET_PROJECT_FOR_PAYMENT,
  ClearState,
  CLEAR_STATE
} from "./action";

export const initialState: LocalState = {
  personInfo: undefined,
  clientProject: undefined,
  role: undefined,
  listOfAdmin: undefined,
  projectForPayment: undefined,
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
function setListOfAdmin(
  state: LocalState,
  { payload }: SetListOfAdmin
): LocalState {
  return {
    ...state,
    listOfAdmin: payload,
  };
}
function setProjectForPayment(
  state: LocalState,
  { payload }: SetProjectForPayment
): LocalState {
  return {
    ...state,
    projectForPayment: payload,
  };
}
function clearState(
  state: LocalState
): LocalState {
  return {
    ...state,
    personInfo: undefined,
    clientProject: undefined,
    role: undefined,
    listOfAdmin: undefined,
    projectForPayment: undefined,
  };
}

export const reducer = createReducer(initialState, {
  [SET_PERSON_INFO]: setPersonInfo,
  [SET_CLIENT_PROJECT]: setClientProject,
  [SET_LIST_OF_ADMIN]: setListOfAdmin,
  [SET_PROJECT_FOR_PAYMENT]: setProjectForPayment,
  [CLEAR_STATE]: clearState,
});
