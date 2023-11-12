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
  SetActiveTab,
  SET_ACTIVE_TAB,
  SetIsActive,
  SetSortKey,
  SetSortOrder,
  SET_IS_ACTIVE,
  SET_SORT_KEY,
  SET_SORT_ORDER,
} from "./action";

export const initialState: LocalState = {
  personInfo: undefined,
  clientProject: undefined,
  clientCampaign: undefined,
  role: undefined,
  listOfAdmin: undefined,
  socketNotify: null,
  listOfNotify: [],
  pagesProject: [],
  pagesCampaign: [],
  filterProject: {
    activeTab: "project",
    isActive: true,
    sortKey: "success",
    sortOrder: "asc",
  },
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
    pagesProject: [],
    pagesCampaign: [],
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

function setPages(state: LocalState, { payload }: SetPages): LocalState {
  if (payload.type === "campaign") {
    return {
      ...state,
      pagesCampaign: payload.pages,
    };
  }
  return {
    ...state,
    pagesProject: payload.pages,
  };
}

function setActiveTab(
  state: LocalState,
  { payload }: SetActiveTab
): LocalState {
  return {
    ...state,
    filterProject: { ...state.filterProject, activeTab: payload },
  };
}
function setIsActive(state: LocalState, { payload }: SetIsActive): LocalState {
  return {
    ...state,
    filterProject: { ...state.filterProject, isActive: payload },
  };
}
function setSortKey(state: LocalState, { payload }: SetSortKey): LocalState {
  return {
    ...state,
    filterProject: { ...state.filterProject, sortKey: payload },
  };
}
function setSortOrder(
  state: LocalState,
  { payload }: SetSortOrder
): LocalState {
  return {
    ...state,
    filterProject: { ...state.filterProject, sortOrder: payload },
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
  [SET_ACTIVE_TAB]: setActiveTab,
  [SET_IS_ACTIVE]: setIsActive,
  [SET_SORT_KEY]: setSortKey,
  [SET_SORT_ORDER]: setSortOrder,
});
