
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

export type Reviews = {
  id: string;
  link: string;
  text: string;
  status: string;
}

export type ReqGetDetails = {
  reviews: Reviews[]
}

export type ReqBrief = {
  projectId: string;
  brief: string;
}

export type Tariff = {
  amount: number;
  id: number;
  name: string;
  price: number;
}

export type ReqGetTariff = {
  tariffs: {
    [key: number]: Tariff[]
  }
}

export type ArchiveProject = {
  id: number;
  start: number;
  end: number;
  statuses: Statuses;
}

export type ReqArchiveProject = {
  result: ArchiveProject[];
}

export type ReqArchiveDetail = {
  result: Reviews[]
}


const foo = {
  "result": [
    {
      "id": 1, "start": 1, "end": 2, "statuses": {
        "all": 0,
        "success": 0,
        "left": 10,
        "wait": 0,
        "moderate": 0,
        "reject": 0,
        "delete": 0
      }
    },
    {
      "id": 1, "start": 1, "end": 2, "statuses": {
        "all": 2,
        "success": 3,
        "left": 10,
        "wait": 0,
        "moderate": 0,
        "reject": 0,
        "delete": 0
      }
    }
  ]
}