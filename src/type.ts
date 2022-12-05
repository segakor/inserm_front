
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
export type Person = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tg: string;
}
export type ReqPersonChange = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tg: string;
}

export type Statuses = {
  all: number;
  delete: number;
  left: number;
  moderate: number;
  reject: number;
  success: number;
  wait: number;
}

export type Project = {
  brief: string;
  id: number;
  name: string;
  statuses?: Statuses;
  tariff_end: number;
  tariff_name: string;
  tariff_start: number;
}

export type ReqGetProject = {
  projectsArray: Project[];
}