export type LocalState = {
  currentPage: PAGE;
  isMobile: boolean
};

export enum PAGE {
  INTRODUCTION = "INTRODUCTION",
  SIGNING = "SIGNING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
