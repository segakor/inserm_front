export const SET_PERSON_INFO = "SET_PERSON_INFO";
export const SET_CLIENT_PROJECT = "SET_CLIENT_PROJECT";

export const setPersonInfo = (payload: any) => ({
  type: SET_PERSON_INFO,
  payload,
});
export const setClientProject = (payload: any) => ({
  type: SET_CLIENT_PROJECT,
  payload,
});

export type SetClientProject = ReturnType<typeof setClientProject>;
export type SetPersonInfo = ReturnType<typeof setPersonInfo>;

export type ReducerAction = SetPersonInfo | SetPersonInfo;
