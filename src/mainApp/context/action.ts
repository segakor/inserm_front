export const SET_PERSON_INFO = "SET_PERSON_INFO";
export const SET_CLIENT_PROJECT = "SET_CLIENT_PROJECT";
export const SET_LIST_OF_ADMIN = "SET_LIST_OF_ADMIN";
export const SET_PROJECT_FOR_PAYMENT = "SET_PROJECT_FOR_PAYMENT";
export const SET_EMPLOYEE_LOGIN = "SET_EMPLOYEE_LOGIN";
export const CLEAR_STATE = "CLEAR_STATE";
export const SET_NOTIFY_REF = "SET_NOTIFY_REF";
export const SET_LIST_OF_NOTIFY = "SET_LIST_OF_NOTIFY";
export const REMOVE_ITEM_LIST_OF_NOTIFY = "REMOVE_ITEM_LIST_OF_NOTIFY";

export const setPersonInfo = (payload: any) => ({
  type: SET_PERSON_INFO,
  payload,
});
export const setClientProject = (payload: any) => ({
  type: SET_CLIENT_PROJECT,
  payload,
});
export const setListOfAdmin = (payload: any) => ({
  type: SET_LIST_OF_ADMIN,
  payload,
});
export const setProjectForPayment = (payload: {
  projectName: string;
  price: number;
  period: number;
  tariffId: number;
}) => ({
  type: SET_PROJECT_FOR_PAYMENT,
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
export const removeItemListOfNotify = (payload: number|null) => ({
  type: REMOVE_ITEM_LIST_OF_NOTIFY,
  payload,
});

export type SetClientProject = ReturnType<typeof setClientProject>;
export type SetPersonInfo = ReturnType<typeof setPersonInfo>;
export type SetListOfAdmin = ReturnType<typeof setListOfAdmin>;
export type SetProjectForPayment = ReturnType<typeof setProjectForPayment>;
export type ClearState = ReturnType<typeof clearState>;
export type SetNotifyRef = ReturnType<typeof setNotifyRef>;
export type SetListOfNotify = ReturnType<typeof setListOfNotify>;
export type RemoveItemListOfNotify = ReturnType<typeof removeItemListOfNotify>;

export type ReducerAction =
  | SetPersonInfo
  | SetPersonInfo
  | SetListOfAdmin
  | SetProjectForPayment
  | ClearState
  | SetNotifyRef
  | SetListOfNotify
  | RemoveItemListOfNotify;
