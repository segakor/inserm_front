import axios from "axios";
import { axiosClient } from "../axios";
import {
  ReqLogin,
  ResLogin,
  ReqChangePassword,
  Person,
  ReqPersonChange,
  ReqGetProject,
  ReqGetProjectDetails,
  ReqGetTariff,
  ReqArchiveProject,
  ReqArchiveDetail,
  ReqGetBrief,
  Reviews,
  ReqGetReviewsWithType,
  ReqCreateBrief,
  ResCreateBrief,
  ReqProjectCreate,
  ReqCreateAdmin,
  ResAdmin,
  ReqSiteRegistration,
  Admin,
  ReqNote,
  ReqRooms,
  ReqCreateReviewList,
  ResHostStatistics,
  ResGetWarmClient,
  ReqCreateCampaign,
  ResGetCampaign,
  ResGetCampaignDetails,
  ResGetListOfBrief,
  ReqCopyBrief,
  ResCampaignTariff,
  ReqCreateCashlessTransfer,
  InvoiceTemplate,
  ResGetCashlessTransfer,
  RefreshedCampaign,
  Idea,
  Promo,
  CreatePromo,
  PromoCheck,
  TariffList,
  PromoStatistics,
  AllPersonCampaign,
  News,
  CreateNews,
  Mail,
  ReqMailUpdate,
  MailDetail,
  BriefNote,
  ReqCreateBriefNote,
  ClientNew,
  DetailsCampaign,
  DetailsTransfer,
  ReferralListAdmin,
  ReferralList,
  PartnerOrderList,
  ConclusionOrder,
  PartnerPayment,
  RemovedReviews,
  NotificationSettings,
} from "../types";

const URL = import.meta.env.VITE_BASE_URL;

export const login = async (value: ReqLogin) => {
  const { data, status } = await axiosClient.post<ResLogin>(
    URL + "/api/user/login",
    {
      ...value,
    }
  );
  return { data, status };
};

export const changePassword = async (value: ReqChangePassword) => {
  const { data, status } = await axiosClient.post(
    URL + "/api/user/changePassword",
    {
      ...value,
    }
  );
  return { data, status };
};

export const getPerson = async () => {
  const { data, status } = await axiosClient.get<Person>(URL + "/api/person");
  return { data, status };
};

export const changePerson = async (value: ReqPersonChange) => {
  const { data, status } = await axiosClient.post(URL + "/api/person/change", {
    ...value,
  });
  return { data, status };
};

export const changePersonTgId = async (value: { tgId: string }) => {
  const { data, status } = await axiosClient.post(
    URL + "/api/person/addTelegramId",
    {
      ...value,
    }
  );
  return { data, status };
};

export const getNotificationSettings = async () => {
  const { data, status } = await axiosClient.get<NotificationSettings>(
    URL + "/api/person/notificationSettings"
  );
  return { data, status };
};
export const updateNotificationSettings = async (
  value: NotificationSettings
) => {
  const { data, status } = await axiosClient.post(
    URL + "/api/person/notificationSettings/update",
    { ...value }
  );
  return { data, status };
};

export const getProject = async (isActive?: boolean) => {
  const { data, status } = await axiosClient.get<ReqGetProject>(
    URL + "/api/project",
    { params: { isActive } }
  );
  return { data, status };
};

export const getProjectDetails = async (id: string) => {
  const { data, status } = await axiosClient.get<ReqGetProjectDetails>(
    URL + `/api/project/${id}`
  );
  return { data, status };
};

export const getAllProject = async (
  isActive: boolean,
  sortOrder: string,
  sortKey: string
) => {
  const { data, status } = await axiosClient.get<ReqGetProject>(
    URL + `/api/project/all`,
    { params: { isActive, sortOrder, sortKey } }
  );
  return { data, status };
};

export const getAllTariff = async () => {
  const { data, status } = await axiosClient.get<ReqGetTariff>(
    URL + `/api/tariff`
  );
  return { data, status };
};

export const getArchiveProject = async (id: string) => {
  const { data, status } = await axiosClient.get<ReqArchiveProject>(
    URL + `/api/archive/${id}`
  );
  return {
    data,
    status,
  };
};

export const getArchiveDetails = async (id: string) => {
  const { data, status } = await axiosClient.get<ReqArchiveDetail>(
    URL + `/api/archive/detail/${id}`
  );
  return {
    data,
    status,
  };
};

export const getBrief = async (id: string, mode?: "prjoect" | "campaign") => {
  const { data, status } = await axiosClient.get<ReqGetBrief>(
    URL + `/api/brief/${id}`,
    { params: { mode: mode } }
  );
  return {
    data,
    status,
  };
};

export const createBrief = async (value: ReqCreateBrief) => {
  const { data, status } = await axiosClient.post<ResCreateBrief>(
    URL + `/api/brief/create`,
    { ...value }
  );
  return {
    data,
    status,
  };
};
export const updateBrief = async (value: ReqCreateBrief) => {
  const { data, status } = await axiosClient.post<ResCreateBrief>(
    URL + `/api/brief/update`,
    { ...value }
  );
  return {
    data,
    status,
  };
};

export const updateReview = async (value: Reviews) => {
  const { data, status } = await axiosClient.post(URL + `/api/review/update`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const createReview = async (value: {
  text: string;
  link: string;
  projectId?: number;
  cardId?: number;
}) => {
  //TODO:Тип ответа!
  const { data, status } = await axiosClient.post(URL + `/api/review/create`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const getReviewsWithType = async (
  type: "moderate" | "isPaid" | "noPaid",
  search?: string
) => {
  const { data, status } = await axiosClient.get<ReqGetReviewsWithType>(
    URL + `/api/review/${type}`,
    { params: { search: search } }
  );
  return {
    data,
    status,
  };
};

export const getRemovedReviews = async (params: { status: string }) => {
  const { data, status } = await axiosClient.get<{ result: RemovedReviews[] }>(
    URL + `/api/review/removeRequest/list`,
    { params: { ...params } }
  );
  return {
    data,
    status,
  };
};

export const updateRemovedReviewsStatus = async (value: {
  requestId: number;
  status: string;
}) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/review/removeRequest/update`,
    { ...value }
  );
  return {
    data,
    status,
  };
};

export const createProject = async (value: ReqProjectCreate) => {
  const { data, status } = await axiosClient.post<ReqGetReviewsWithType>(
    URL + `/api/project/create`,
    { ...value }
  );
  return {
    data,
    status,
  };
};

export const createAdmin = async (value: ReqCreateAdmin) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/user/registration`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const getAdmin = async () => {
  const { data, status } = await axiosClient.get<ResAdmin>(
    URL + `/api/user/workers`
  );
  return {
    data,
    status,
  };
};

export const createUserFromSite = async (value: ReqSiteRegistration) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/user/siteRegistration`,
    { ...value }
  );
  return {
    data,
    status,
  };
};
export const updateAdmin = async (value: Admin) => {
  const { data, status } = await axiosClient.post(URL + `/api/user/update`, {
    ...value,
  });
  return {
    data,
    status,
  };
};
export const deleteAdmin = async (value: { email: string }) => {
  const { data, status } = await axiosClient.post(URL + `/api/user/delete`, {
    ...value,
  });
  return {
    data,
    status,
  };
};
export const resetPassword = async (value: { email: string }) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/user/resetPassword`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const refreshToken = async (value: { refreshToken: string }) => {
  const { data, status } = await axiosClient.post<ResLogin>(
    URL + `/api/user/auth`,
    { ...value }
  );
  return {
    data,
    status,
  };
};

export const unsubdcribe = async (value: { projectId: number }) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/tariff/unsubscribe`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const unsubdcribeCampaign = async (value: { campaignId: number }) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/campaignTariff/unsubscribe`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const createNote = async (
  value: {
    id: string;
    text: string;
  },
  type: string
) => {
  const path = type === "project" ? "project" : "campaign";

  const { data, status } = await axiosClient.post(URL + `/api/${path}/notes`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const getNotes = async (id: string, type: string) => {
  const path = type === "project" ? "project" : "campaign";

  const { data, status } = await axiosClient.get<ReqNote>(
    URL + `/api/${path}/notes/${id}`
  );
  return {
    data,
    status,
  };
};

export const deleteNote = async (noteId: number, type: string) => {
  const path = type === "project" ? "project" : "campaign";

  const { data, status } = await axiosClient.post(
    URL + `/api/${path}/removeNote`,
    {
      noteId,
    }
  );
  return {
    data,
    status,
  };
};

export const getRooms = async () => {
  const { data, status } = await axiosClient.get<ReqRooms>(
    URL + `/api/chat/rooms`
  );
  return {
    data,
    status,
  };
};

export const setMarkOnChat = async (value: {
  isMark: boolean;
  roomId: number;
}) => {
  const { data, status } = await axiosClient.post(URL + "/api/chat/mark", {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const createRoom = async () => {
  const { data, status } = await axiosClient.get<{ roomId: number }>(
    URL + `/api/chat/create`
  );
  return {
    data,
    status,
  };
};

export const deleteReview = async (value: { id: string }) => {
  const { data, status } = await axiosClient.post(URL + "/api/review/delete", {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const changeStatusProject = async (
  value: {
    id: number;
    isActive: boolean;
  },
  type: "project" | "campaign"
) => {
  const { data, status } = await axiosClient.post(URL + `/api/${type}/status`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const createReviewList = async (value: ReqCreateReviewList) => {
  //TODO:Тип ответа!
  const { data, status } = await axiosClient.post(URL + `/api/review/import`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const getAllClientNew = async (params?: { status: string }) => {
  const { data, status } = await axiosClient.get<{ result: ClientNew[] }>(
    URL + `/api/person/allNew`,
    { params: { ...params } }
  );
  return {
    data,
    status,
  };
};

export const getHostStatistics = async (params?: {
  start: number;
  end: number;
}) => {
  const { data, status } = await axiosClient.get<ResHostStatistics>(
    URL + `/api/statistics`,
    { params: { ...params } }
  );
  return {
    data,
    status,
  };
};

export const registration = async (value: {
  email: string;
  password: string;
  type: "clientRegistration" | "partnerRegistration";
}) => {
  const { email, password } = value;
  const { data, status } = await axiosClient.post(
    URL + `/api/user/${value.type}`,
    {
      email,
      password,
    }
  );
  return {
    data,
    status,
  };
};

export const getWarmClient = async (params?: {
  start: number;
  end: number;
}) => {
  const { data, status } = await axiosClient.get<ResGetWarmClient>(
    URL + `/api/admin/warmClient`,
    { params: { ...params } }
  );
  return {
    data,
    status,
  };
};

export const createCampaign = async (value: ReqCreateCampaign) => {
  const { data, status } = await axiosClient.post<{ result: { id: number } }>(
    URL + `/api/campaign/create`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const getCampaign = async (
  isActive?: boolean,
  sortOrder?: string,
  sortKey?: string
) => {
  const { data, status } = await axiosClient.get<ResGetCampaign>(
    URL + "/api/campaign",
    { params: { isActive, sortOrder, sortKey } }
  );
  return { data, status };
};

export const getCampaignDetails = async (id: string) => {
  const { data, status } = await axiosClient.get<ResGetCampaignDetails>(
    URL + `/api/campaign/${id}`
  );
  return { data, status };
};

export const getListOfBrief = async () => {
  const { data, status } = await axiosClient.get<ResGetListOfBrief>(
    URL + `/api/brief/user/list`
  );
  return { data, status };
};

export const copyBrief = async (value: ReqCopyBrief) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/project/saveBrief`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const getCampaignTariff = async () => {
  const { data, status } = await axiosClient.get<ResCampaignTariff>(
    URL + `/api/campaignTariff`
  );
  return { data, status };
};

export const savePrice = async (value: {
  email: string;
  name: string;
  price: number;
}) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/project/savePrice`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const createCashlessTransfer = async (
  value: ReqCreateCashlessTransfer
) => {
  const { data, status } = await axiosClient.post<{ result: { id: number } }>(
    URL + `/api/transfer`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const getInvoiceTemplate = async (id: number) => {
  const { data, status } = await axiosClient.get<InvoiceTemplate>(
    URL + `/api/transfer/template/${id}`
  );
  return { data, status };
};

export const getCashlessTransfer = async (params: { status: string }) => {
  const { data, status } = await axiosClient.get<ResGetCashlessTransfer>(
    URL + `/api/transfer`,
    { params: { ...params } }
  );
  return { data, status };
};

export const changeTransferStatus = async (value: {
  transferId: number;
  isApproved: boolean;
}) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/transfer/update`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};
export const changeTransferStatusArchive = async (value: {
  transferId: number;
  isActive: boolean;
}) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/transfer/archive`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const getActTempalte = async (id: number) => {
  const { data, status } = await axiosClient.get<InvoiceTemplate>(
    URL + `/api/transfer/act/${id}`
  );
  return { data, status };
};

export const refreshCampaign = async (campaignId: number) => {
  const { data, status } = await axiosClient.post<{
    result: RefreshedCampaign;
  }>(URL + `/api/campaign/refresh`, {
    campaignId,
  });
  return {
    data,
    status,
  };
};

export const removeCampaign = async (campaignId: number) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/campaign/remove`,
    {
      campaignId,
    }
  );
  return {
    data,
    status,
  };
};

export const createIdea = async (text: string) => {
  const { data, status } = await axiosClient.post(URL + `/api/wish/create`, {
    text,
  });
  return {
    data,
    status,
  };
};

export const getIdea = async () => {
  const { data, status } = await axiosClient.get<{ result: Idea[] }>(
    URL + `/api/wish/all`
  );
  return { data, status };
};

export const changeLink = async (value: { link: string; cardId: number }) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/campaign/changeLink`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const createPromo = async (value: CreatePromo) => {
  const { data, status } = await axiosClient.post(URL + `/api/promo/create`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const getPromo = async () => {
  const { data, status } = await axiosClient.get<{ result: Promo[] }>(
    URL + `/api/promo/all`
  );
  return { data, status };
};

export const archivePromo = async (id: number) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/promo/archive/${id}`
  );
  return {
    data,
    status,
  };
};

export const promoCheck = async (value: PromoCheck) => {
  const { data, status } = await axiosClient.post<{
    result: { giftCount: number };
  }>(URL + `/api/promo/check`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const getSubscription = async () => {
  const { data, status } = await axiosClient.get<{ result: TariffList }>(
    URL + `/api/campaignTariff/campaignList`
  );
  return { data, status };
};

export const getReferralLink = async () => {
  const { data, status } = await axiosClient.get<{ result: string }>(
    URL + `/api/partner/link`
  );
  return { data, status };
};

export const getReferralListAdmin = async () => {
  const { data, status } = await axiosClient.get<{
    result: ReferralListAdmin[];
  }>(URL + `/api/partner/adminList`);
  return { data, status };
};

export const getReferralList = async () => {
  const { data, status } = await axiosClient.get<{ result: ReferralList[] }>(
    URL + `/api/partner/list`
  );
  return { data, status };
};

export const getPartnerOrderList = async () => {
  const { data, status } = await axiosClient.get<PartnerOrderList>(
    URL + `/api/partner/order/list`
  );
  return { data, status };
};

export const createСonclusion = async () => {
  const { data, status } = await axiosClient.post(URL + `/api/partner/create`);
  return {
    data,
    status,
  };
};

export const getConclusionOrder = async () => {
  const { data, status } = await axiosClient.get<{ result: ConclusionOrder[] }>(
    URL + `/api/partner/order/adminList`
  );
  return {
    data,
    status,
  };
};

export const createPartnerPayment = async (value: PartnerPayment) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/partner/payment`,
    { ...value }
  );
  return {
    data,
    status,
  };
};

export const getPartnerPayment = async (id: number) => {
  const { data, status } = await axiosClient.get<{
    result: PartnerPayment & { id: number };
  }>(URL + `/api/partner/payment/${id}`);
  return {
    data,
    status,
  };
};

export const updateOrderPartner = async (value: {
  orderId: number;
  isPaid: boolean;
}) => {
  const { data, status } = await axiosClient.post(URL + `/api/partner/update`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const referralUpdate = async (value: {
  referralId: number;
  isPaid: boolean;
}) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/referral/update`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const getPromoStatistics = async () => {
  const { data, status } = await axiosClient.get<{ result: PromoStatistics[] }>(
    URL + `/api/promo/statistics`
  );
  return { data, status };
};

export const getFinanceStatistics = async (params?: {
  start: number;
  end: number;
}) => {
  const { data, status } = await axiosClient.get<{
    totalPrice: number;
    revenue: number;
  }>(URL + `/api/statistics/finance`, { params: { ...params } });
  return { data, status };
};

export const getPersonCampaignList = async (id: number) => {
  const { data, status } = await axiosClient.get<AllPersonCampaign>(
    URL + `/api/person/campaignList/${id}`
  );
  return { data, status };
};

export const getNews = async () => {
  const { data, status } = await axiosClient.get<{ result: News[] }>(
    URL + `/api/news/list`
  );
  return { data, status };
};

export const createNews = async (value: CreateNews) => {
  const { data, status } = await axiosClient.post(URL + `/api/news/create`, {
    ...value,
  });
  return { data, status };
};

export const deleteNews = async (value: { id: number }) => {
  const { data, status } = await axiosClient.post(URL + `/api/news/delete`, {
    ...value,
  });
  return { data, status };
};

export const updateReviewByClient = async (value: {
  id: number;
  text: string;
}) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/review/clientUpdate`,
    {
      ...value,
    }
  );
  return {
    data,
    status,
  };
};

export const deleteMessage = async (value: { messageId: number }) => {
  const { data, status } = await axiosClient.post(URL + `/api/chat/delete`, {
    ...value,
  });
  return { data, status };
};

export const returnArchived = async (value: { id: number }) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/campaign/returnArchived`,
    {
      ...value,
    }
  );
  return { data, status };
};

export const getMails = async () => {
  const { data, status } = await axiosClient.get<{ result: Mail[] }>(
    URL + `/api/mail/list`
  );
  return { data, status };
};

export const updateMail = async (value: ReqMailUpdate) => {
  const { data, status } = await axiosClient.post(URL + `/api/mail/update`, {
    ...value,
  });
  return { data, status };
};

export const getMailDetails = async (id: number) => {
  const { data, status } = await axiosClient.get<{ result: MailDetail }>(
    URL + `/api/mail/detail/${id}`
  );
  return { data, status };
};

export const sendEmail = async (id: number) => {
  const { data, status } = await axiosClient.post(URL + `/api/mail/sendTest`, {
    id,
  });
  return { data, status };
};

export const getBriefNotes = async (id: number) => {
  const { data, status } = await axiosClient.get<{ result: BriefNote[] }>(
    URL + `/api/brief/notes/${id}`
  );
  return { data, status };
};

export const createBriefNote = async (value: ReqCreateBriefNote) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/brief/notes/create`,
    {
      ...value,
    }
  );
  return { data, status };
};

export const getCampaignPaymentDetails = async (id: string) => {
  const { data, status } = await axiosClient.get<{ result: DetailsCampaign }>(
    URL + `/api/campaign/paymentDetails/${id}`
  );
  return { data, status };
};

export const getCampaignTransferDetails = async (id: string) => {
  const { data, status } = await axiosClient.get<DetailsTransfer>(
    URL + `/api/transfer/detail/${id}`
  );
  return { data, status };
};

export const createCardRating = async (value: {
  start: number;
  current: number;
  cardId: number;
}) => {
  const { data, status } = await axiosClient.post(URL + `/api/card/rating`, {
    ...value,
  });
  return { data, status };
};

export const createRemoveReviewRequest = async (value: {
  reviewId: number;
}) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/review/removeRequest/create `,
    {
      ...value,
    }
  );
  return { data, status };
};

export const uploadImgBB = async (data: any) => {
  //NOTE: data type UploadRequestOption
  console.log(data.file);
  try {
    let body = new FormData();
    body.append("image", data.file);
    body.append("test", "test");
    const response = await fetch(
      "https://api.imgbb.com/1/upload?expiration=600&key=e4e66ebc0393850d4c6198b88812d20f",
      { method: "POST", body }
    );
    const response2 = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body,
    });
    const result = await response.json();
    data.onSuccess(result);
  } catch (error) {
    data.onError(error);
  }
};
