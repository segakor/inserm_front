export type Role =
  | "CLIENT"
  | "HOST"
  | "SUPERVISOR"
  | "SUPPORT"
  | "ADMIN"
  | "PARTNER"
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
  tgId: string;
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
  forOne: number;
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
  isActive?: boolean;
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
  is_edited?: boolean; // project
  isEdited?: boolean; // campaign
};

export type ReqGetProjectDetails = {
  reviews: Reviews[];
  name: string;
  statuses: Statuses;
  tariff: TariffProject;
  userId: number;
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
  isMark: boolean;
};
export type ReqRooms = {
  result: Room[];
};

export type ReqCreateReviewList = {
  reviews: { text: string; link: string; key: number | string }[];
  projectId?: string;
  cardId?: string;
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
  campaigns: ClientProject[];
  date: number;
};

export type ClientProjectNew = {
  amount: number;
  autopay: boolean;
  briefDate: number;
  history: {
    date: number;
    price: number;
  }[];
  id: number;
  is_active: boolean;
  name: string;
  payType: string;
  platforms: string[];
  price: number;
  tariffName: string;
};

export type ClientNew = {
  id: number;
  email: string;
  name: string;
  phone: string;
  tg: string;
  tgId: string;
  totalPrice: number;
  projects: ClientProjectNew[];
  campaigns: ClientProjectNew[];
  date: number;
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
    type: "campaign" | "project";
    id: number;
  };
  promo?: {
    name: string;
    link: string;
    type: AreaType;
  };
  referral?: string;
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
  isProcessOfWriting: boolean;
  isActive?: boolean;
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
  statuses: Statuses;
  amount: number;
  isPromo: boolean;
  startRating: number;
  currentRating: number;
};

export type GrouppedCampaign = {
  type: AreaType;
  statuses: Statuses;
  cards: CampaignCard[];
};

export type ArchiveCard = {
  id: number;
  link: string;
  type: string;
  date: number;
  amount: number;
  reviews: Reviews[];
  statuses: Statuses;
};

export type ArchiveCampaignCard = {
  date: number;
  archive: ArchiveCard[];
};

export type ResGetCampaignDetails = {
  id: number;
  name: string;
  date: number;
  period: number;
  statuses: Statuses;
  groppedByType: GrouppedCampaign[];
  archives: ArchiveCampaignCard[];
  userId: number;
  isTransfer: boolean;
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

export type Idea = {
  id: number;
  text: string;
  user: string;
  date: number;
};

export type Promo = {
  id: number;
  name: string;
  start: number;
  end: number;
  giftCount: number;
  minCount: number;
  isArchived: boolean;
};

export type PromoStatistics = Promo & {
  campaign: Campaign;
  totalPrice: number;
};

export type CreatePromo = Omit<Promo, "id">;

export type PromoCheck = {
  name: string;
  email: string;
  count: number;
};

export type ResultCodePromo =
  | "promo_not_found"
  | "promo_has_expired"
  | "not_enough_reviews_in_the_order"
  | "promo_is_archived"
  | "promo_has_already_been_used"
  | "success";

export type CampaignSubscription = {
  campaignId: number;
  name: string;
  autopay: boolean;
  price: number;
  count: number;
  period: number;
};

export type ProjectSubscription = {
  projectId: number;
  name: string;
  autopay: boolean;
  price: number;
  count: number;
  start: number;
  end: number;
};

export type TariffList = {
  campaigns: CampaignSubscription[];
  projects: ProjectSubscription[];
};

export type OptionsReferral =
  | "getLink"
  | "paymentStatistics"
  | "exportMoney"
  | "conditions";

export type ReferralHistories = {
  name: string;
  price: number;
  isPaid: boolean;
  date: number;
  commission: number;
  platforms: string[];
  amount: number;
};
export type Referrals = {
  email: string;
  date: number;
  campaignCount: number;
  total: number;
  commission: number;
  histories: ReferralHistories[];
};
export type ReferralListAdmin = {
  email: string;
  date: number;
  campaignCount: number;
  total: number;
  commission: number;
  commissionPaid: number;
  commissionDifference: number;
  referrals: Referrals[];
};

export type ReferralList = {
  commission: number;
  date: number;
  id: number;
  total: number;
  histories: ReferralHistories[];
  campaignIds: number[];
};

export type PartnerOrderList = {
  balance: number;
  orders:{
    id:number;
    price:number;
    date:number;
    status:string;
  }[]
}

export type OptionsClientBase =
  | "allClient"
  | "warmClient"
  | "cashless"
  | "idea"
  | "referral";

export type AllPersonCampaign = {
  campaigns: { id: number; name: string }[];
  projects: { id: number; name: string }[];
};

export type News = {
  id: number;
  title: string;
  description: string;
  createDate: number;
};

export type CreateNews = Omit<News, "id">;

export type Mail = {
  id: number;
  name: string;
  subject: string;
};

export type MailDetail = Mail & {
  body: string;
};

export type ReqMailUpdate = Omit<MailDetail, "name">;

export type BriefNote = Omit<Note, "user">;

export type ReqCreateBriefNote = {
  briefId: number;
  text: string;
};

export type DetailsCampaign = {
  projectName: string;
  groppedByType: GrouppedCampaign[];
};

export type DetailsTransfer = Omit<ReqCreateCashlessTransfer, "campaignId">;
