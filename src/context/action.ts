/* export const GO_TO_SIGNIGN_PAGE = "GO_TO_SIGNIGN_PAGE"; */

export const SET_IS_MOBILE = "SET_IS_MOBILE";

/* export const goToSignignPageAction = () => ({ type: GO_TO_SIGNIGN_PAGE }); */



export const setIsMobile = (payload: boolean) => ({
  type: SET_IS_MOBILE,
  payload,
});

export type SetIsMobile = ReturnType<typeof setIsMobile>;

export type ReducerAction =
  SetIsMobile;
