import { createReducer } from "@reduxjs/toolkit";
import { LocalState, PAGE } from "./types";
import {
  SetIsMobile,
  SET_IS_MOBILE,
} from "./action";

export const initialState: LocalState = {
  currentPage: PAGE.INTRODUCTION,
  isMobile: false,
  role: undefined
};

function setIsMobile(
  state: LocalState,
  { payload }: SetIsMobile
): LocalState {
  return {
    ...state,
    isMobile: payload,
  };
}

export const reducer = createReducer(initialState, {
  [SET_IS_MOBILE]: setIsMobile,
});
