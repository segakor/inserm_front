export const SET_PERSON_INFO = "SET_PERSON_INFO";
export const SET_CLIENT_PROJECT = "SET_CLIENT_PROJECT";
export const SET_LIST_OF_ADMIN = "SET_LIST_OF_ADMIN";

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

export type SetClientProject = ReturnType<typeof setClientProject>;
export type SetPersonInfo = ReturnType<typeof setPersonInfo>;
export type SetListOfAdmin = ReturnType<typeof setListOfAdmin>;

export type ReducerAction = SetPersonInfo | SetPersonInfo | SetListOfAdmin;
