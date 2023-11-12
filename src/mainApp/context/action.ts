export const SET_PERSON_INFO = "SET_PERSON_INFO";
export const SET_CLIENT_PROJECT = "SET_CLIENT_PROJECT";
export const SET_CLIENT_CAMPAIGN = "SET_CLIENT_CAMPAIGN";
export const SET_LIST_OF_ADMIN = "SET_LIST_OF_ADMIN";
export const SET_EMPLOYEE_LOGIN = "SET_EMPLOYEE_LOGIN";
export const CLEAR_STATE = "CLEAR_STATE";
export const SET_NOTIFY_REF = "SET_NOTIFY_REF";
export const SET_LIST_OF_NOTIFY = "SET_LIST_OF_NOTIFY";
export const REMOVE_ITEM_LIST_OF_NOTIFY = "REMOVE_ITEM_LIST_OF_NOTIFY";
export const SET_PAGES = "SET_PAGES";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const SET_IS_ACTIVE = "SET_IS_ACTIVE";
export const SET_SORT_KEY = "SET_SORT_KEY";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

export const setPersonInfo = (payload: any) => ({
  type: SET_PERSON_INFO,
  payload,
});
export const setClientProject = (payload: any) => ({
  type: SET_CLIENT_PROJECT,
  payload,
});
export const setClientCampaign = (payload: any) => ({
  type: SET_CLIENT_CAMPAIGN,
  payload,
});
export const setListOfAdmin = (payload: any) => ({
  type: SET_LIST_OF_ADMIN,
  payload,
});
export const clearState = () => ({
  type: CLEAR_STATE,
});

export const setNotifyRef = (payload: any) => ({
  type: SET_NOTIFY_REF,
  payload,
});
export const setListOfNotify = (payload: any) => ({
  type: SET_LIST_OF_NOTIFY,
  payload,
});
export const removeItemListOfNotify = (payload: number | null) => ({
  type: REMOVE_ITEM_LIST_OF_NOTIFY,
  payload,
});
export const setPages = (payload: { pages: number[]; type: string }) => ({
  type: SET_PAGES,
  payload,
});
export const setActiveTab = (payload: "project" | "campaign") => ({
  type: SET_ACTIVE_TAB,
  payload,
});
export const setIsActive = (payload: boolean) => ({
  type: SET_IS_ACTIVE,
  payload,
});
export const setSortKey = (payload: string) => ({
  type: SET_SORT_KEY,
  payload,
});
export const setSortOrder = (payload: string) => ({
  type: SET_SORT_ORDER,
  payload,
});

export type SetClientProject = ReturnType<typeof setClientProject>;
export type SetClientCampaign = ReturnType<typeof setClientCampaign>;
export type SetPersonInfo = ReturnType<typeof setPersonInfo>;
export type SetListOfAdmin = ReturnType<typeof setListOfAdmin>;
export type ClearState = ReturnType<typeof clearState>;
export type SetNotifyRef = ReturnType<typeof setNotifyRef>;
export type SetListOfNotify = ReturnType<typeof setListOfNotify>;
export type RemoveItemListOfNotify = ReturnType<typeof removeItemListOfNotify>;
export type SetPages = ReturnType<typeof setPages>;
export type SetActiveTab = ReturnType<typeof setActiveTab>;
export type SetIsActive = ReturnType<typeof setIsActive>;
export type SetSortKey = ReturnType<typeof setSortKey>;
export type SetSortOrder = ReturnType<typeof setSortOrder>;

export type ReducerAction =
  | SetPersonInfo
  | SetClientCampaign
  | SetClientProject
  | SetPersonInfo
  | SetListOfAdmin
  | ClearState
  | SetNotifyRef
  | SetListOfNotify
  | RemoveItemListOfNotify
  | SetPages
  | SetActiveTab
  | SetIsActive
  | SetSortKey
  | SetSortOrder;
