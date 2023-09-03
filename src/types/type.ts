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
  longToken: string;
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
  autopay: boolean;
  tariff: TariffProject;
  brief?: boolean;
  type?: string;
  isPaid?: string; //TODO: fake
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
  host?: string;
  in_work?: boolean;
  is_paid?: boolean;
  tg?: string;
  key: string;
};

export type ReqGetProjectDetails = {
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
  brief: Brief;
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
};

export type ReqGetReviewsWithType = {
  result: Reviews[];
};

export type ReqCreateBrief = Omit<Brief, "id"> & {
  projectId: string;
};

export type ResCreateBrief = {
  result: Brief;
};

export type ReqProjectCreate = {
  name: string;
  tariffId: number;
  period: number;
  price: number;
};

export type ReqCreateAdmin = {
  email: string;
  password: string;
  role: Role;
};

export type Admin = {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
};

export type ResAdmin = {
  result: Admin[];
};

export type ReqSiteRegistration = ReqProjectCreate & {
  email: string;
};

export type Note = {
  id: number;
  text: string;
  user: string;
  date: number;
};

export type ReqNote = {
  result: Note[];
};

export type Room = {
  id: number;
  userId: number;
  email: string;
  name: string;
  projects: { name: string; id: number }[];
  campaigns: { name: string; id: number }[];
  unread: number;
};
export type ReqRooms = {
  result: Room[];
};

export type ReqCreateReviewList = {
  reviews: { text: string; link: string }[];
  projectId: string;
};

export type ClientProject = {
  id: number;
  name: string;
  is_active: boolean;
  startDate: number;
  price: number;
  tariffName: string;
  endDate: number;
  autopay: boolean;
};
export type Client = {
  id: number;
  email: string;
  name: string;
  phone: string;
  tg: string;
  totalPrice: number;
  projects: ClientProject[];
  campaigns: Omit<ClientProject[], "autopay">;
};

export type ResGetAllClient = {
  result: Client[];
};

export type Host = { name: string; publicated: number };

export type HostStatistics = Omit<Statuses, "all"> & {
  hosts: Host[];
};

export type ResHostStatistics = {
  result: HostStatistics;
};

export type Notify = {
  roomId: number;
  unread: number;
};

export type WarmClient = {
  email: string;
  projectName: string;
  price: number;
  date: number;
};

export type ResGetWarmClient = {
  result: WarmClient[];
};

export enum AreaType {
  YA_MAP = "ya_map",
  GOOGLE = "google",
  TWO_GIS = "two_gis",
  AVITO = "avito",
  FLAMP = "flamp",
  YELL = "yell",
  ZOON = "zoon",
  YA_BRA = "ya_bra",
}

export type CampaignCardForm = {
  link: string;
  type: AreaType;
  price: number;
  amount: number;
};

export type ReqCreateCampaign = {
  name: string;
  email: string;
  cards: CampaignCardForm[];
  brief?: {
    type: "camaign" | "project";
    id: number;
  };
};

export type Campaign = {
  id: number;
  name: string;
  brief: boolean;
  period: number;
  statuses: Statuses;
  type?: string;
  isPaid: boolean;
  date: number;
  autopay: boolean;
  isTransfer: boolean;
  transferId: number;
};

export type ResGetCampaign = {
  result: Campaign[];
};

export type CampaignCard = {
  id: number;
  link: string;
  type: string;
  isFinished: boolean;
  reviews: Reviews[];
  amount: number;
};

export type GrouppedCampaign = {
  type: AreaType;
  statuses: Statuses;
  cards: CampaignCard[];
};

export type ArchiveCampaignCard = {
  id: number;
  link: string;
  type: string;
  date: number;
  amount: number;
  reviews: Reviews[];
  statuses: Statuses;
};

export type ResGetCampaignDetails = {
  id: number;
  name: string;
  date: number;
  period: number;
  statuses: Statuses;
  groppedByType: GrouppedCampaign[];
  archive: ArchiveCampaignCard[];
};

export type BriefList = {
  type: "project" | "campaign";
  id: number;
  name: string;
};

export type ResGetListOfBrief = {
  result: BriefList[];
};

export type ReqCopyBrief = {
  id: number;
  name: string;
  type: "campaign" | "project";
  field: string;
};

export type CampaignTariff = {
  id: number;
  countRange: number[];
  price: number;
};

export type ResCampaignTariff = {
  result: CampaignTariff[];
};

export type ReqCreateCashlessTransfer = {
  campaignId: number;
  company: string;
  inn: string;
  ogrn: string;
  email: string;
  phone: string;
  address: string;
};

export type InvoiceTemplate = {
  content: any;
  styles: any;
};

export type CashlessTransfer = ReqCreateCashlessTransfer & {
  id: number;
  price: number;
  amount: number;
  date: number;
  isApproved: boolean;
  isActive: boolean;
  campaign: string;
  number: number;
};

export type ResGetCashlessTransfer = {
  result: CashlessTransfer[];
};

export type CashlessStatus = "wait" | "approved" | "archive";

export type RefreshedCampaign = {
  name: string;
  price: number;
};
