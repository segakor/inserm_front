export const SET_PERSON_INFO = "SET_PERSON_INFO";
export const SET_CLIENT_PROJECT = "SET_CLIENT_PROJECT";
export const SET_CLIENT_CAMPAIGN = "SET_CLIENT_CAMPAIGN";
export const SET_LIST_OF_ADMIN = "SET_LIST_OF_ADMIN";
export const SET_EMPLOYEE_LOGIN = "SET_EMPLOYEE_LOGIN";
export const CLEAR_STATE = "CLEAR_STATE";
export const SET_NOTIFY_REF = "SET_NOTIFY_REF";
export const SET_LIST_OF_NOTIFY = "SET_LIST_OF_NOTIFY";
export const REMOVE_ITEM_LIST_OF_NOTIFY = "REMOVE_ITEM_LIST_OF_NOTIFY";
export const SET_PAGES = "SET_PAGES"

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
export const setPages = (payload: any) => ({
  type: SET_PAGES,
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
  | SetPages;
