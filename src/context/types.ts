export type LocalState = {
  currentPage: PAGE;
  isMobile: boolean
  role: 'CLIENT' | 'HOST' | 'SUPERVISOR' | 'SUPPORT' | 'ADMIN' | undefined;
};

export enum PAGE {
  INTRODUCTION = "INTRODUCTION",
  SIGNING = "SIGNING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
