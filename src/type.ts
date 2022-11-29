
export type KeysFromConst<T extends {}> = T[keyof T];

export type role = 'CLIENT' | 'HOST' | 'SUPERVISOR' | 'SUPPORT' | 'ADMIN' | null;

export type ResLogin = {
  role: role
  token: string;
}
export type ReqLogin = {
  email: string;
  password: string;
}
export type ReqChangePassword = {
  oldPassword: string;
  newPassword: string;
}