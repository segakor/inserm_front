export type KeysFromConst<T extends {}> = T[keyof T];

export type Role =
  | "CLIENT"
  | "HOST"
  | "SUPERVISOR"
  | "SUPPORT"
  | "ADMIN"
  | null;

export type ResLogin = {
  role: Role;
  token: string;
};
export type ReqLogin = {
  email: string;
  password: string;
};
export type ReqChangePassword = {
  oldPassword: string;
  newPassword: string;
};
export type Person = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tg: string;
};
export type ReqPersonChange = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tg: string;
};

export type Statuses = {
  all: number;
  delete: number;
  left: number;
  moderate: number;
  reject: number;
  success: number;
  wait: number;
};

type TariffProject = {
  amount: number;
  end: number;
  name: string;
  price: number;
  start: number;
};

export type Project = {
  id: number;
  name: string;
  statuses?: Statuses;
  tariff: TariffProject;
};

export type ReqGetProject = {
  projectsArray: Project[];
};

export type Reviews = {
  id: string;
  link: string;
  text: string;
  status: string;
  date: number | string;
  host: string;
  in_work: boolean;
  is_paid: boolean;
  tg: string;
};

export type ReqGetDetails = {
  reviews: Reviews[];
  name: string;
  statuses: Statuses;
  tariff: TariffProject;
};

export type Tariff = {
  amount: number;
  id: number;
  name: string;
  price: number;
};

export type ReqGetTariff = {
  tariffs: {
    [key: number]: Tariff[];
  };
};

export type ArchiveProject = {
  id: number;
  start: number;
  end: number;
  statuses: Statuses;
};

export type ReqArchiveProject = {
  result: ArchiveProject[];
};

export type ReqArchiveDetail = {
  result: Reviews[];
};

export type ReqGetBrief = {
  brief: Brief
};

export type Brief = {
  id: number;
  field_1: string;
  field_2: string;
  field_3: string;
  field_4: string;
  field_5: string;
  field_6: string;
  field_7: string;
  field_8: string;
  field_9: string;
  field_10: string;
  field_11: string;
  field_12: string;
}

export type ReqGetReviewsWithType = {
  result: Reviews[];
};

export type ReqCreateBrief = {
  projectId: string;
  field_1: string;
  field_2: string;
  field_3: string;
  field_4: string;
  field_5: string;
  field_6: string;
  field_7: string;
  field_8: string;
  field_9: string;
  field_10: string;
  field_11: string;
  field_12?: string;
}

export type ResCreateBrief = {
  result: Brief
}

export type ReqProjectCreate = {
  name: string;
  tariffId: number;
  period: number;
  price: number;
}

export type ReqCreateAdmin = {
  email: string;
  password: string;
  role: Role;
}

export type ListOfAdmin = {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export type ResAdmin = {
  result: ListOfAdmin[]
}

export type ProjectForPayment = {
  projectName: string;
  price: number;
  period: number;
  tariffId: number;
}

export type ReqSiteRegistration = ReqProjectCreate & {
  email: string;
}