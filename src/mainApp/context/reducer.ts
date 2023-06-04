import { createReducer } from "@reduxjs/toolkit";
import { LocalState } from "./types";
import {
  SetPersonInfo,
  SetClientProject,
  SET_PERSON_INFO,
  SET_CLIENT_PROJECT,
  SetListOfAdmin,
  SET_LIST_OF_ADMIN,
  CLEAR_STATE,
  SetNotifyRef,
  SET_NOTIFY_REF,
  SET_LIST_OF_NOTIFY,
  SetListOfNotify,
  RemoveItemListOfNotify,
  REMOVE_ITEM_LIST_OF_NOTIFY,
  SET_CLIENT_CAMPAIGN,
  SetClientCampaign,
  SetPages,
  SET_PAGES,
} from "./action";

export const initialState: LocalState = {
  personInfo: undefined,
  clientProject: undefined,
  clientCampaign: undefined,
  role: undefined,
  listOfAdmin: undefined,
  socketNotify: null,
  listOfNotify: [],
  pages: [],
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
function setClientCampaign(
  state: LocalState,
  { payload }: SetClientCampaign
): LocalState {
  return {
    ...state,
    clientCampaign: payload,
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
function clearState(state: LocalState): LocalState {
  return {
    ...state,
    personInfo: undefined,
    clientProject: undefined,
    clientCampaign: undefined,
    role: undefined,
    listOfAdmin: undefined,
    socketNotify: null,
    listOfNotify: [],
    pages: [],
  };
}

function setNotifyRef(
  state: LocalState,
  { payload }: SetNotifyRef
): LocalState {
  return {
    ...state,
    socketNotify: payload,
  };
}

function setListOfNotify(
  state: LocalState,
  { payload }: SetListOfNotify
): LocalState {
  return {
    ...state,
    listOfNotify: payload,
  };
}

function removeItemListOfNotify(
  state: LocalState,
  { payload }: RemoveItemListOfNotify
): LocalState {
  return {
    ...state,
    listOfNotify: state.listOfNotify.filter((item) => item.roomId !== payload),
  };
}

function setPages(
  state: LocalState,
  { payload }: SetPages
): LocalState {
  return {
    ...state,
    pages: payload,
  };
}

export const reducer = createReducer(initialState, {
  [SET_PERSON_INFO]: setPersonInfo,
  [SET_CLIENT_PROJECT]: setClientProject,
  [SET_CLIENT_CAMPAIGN]: setClientCampaign,
  [SET_LIST_OF_ADMIN]: setListOfAdmin,
  [CLEAR_STATE]: clearState,
  [SET_NOTIFY_REF]: setNotifyRef,
  [SET_LIST_OF_NOTIFY]: setListOfNotify,
  [REMOVE_ITEM_LIST_OF_NOTIFY]: removeItemListOfNotify,
  [SET_PAGES]: setPages,
});
