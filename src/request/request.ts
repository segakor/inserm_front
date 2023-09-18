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
  ResGetAllClient,
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

export const getProject = async () => {
  const { data, status } = await axiosClient.get<ReqGetProject>(
    URL + "/api/project"
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
  type: "moderate" | "isPaid" | "noPaid"
) => {
  const { data, status } = await axiosClient.get<ReqGetReviewsWithType>(
    URL + `/api/review/${type}`
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

export const getRooms = async () => {
  const { data, status } = await axiosClient.get<ReqRooms>(
    URL + `/api/chat/rooms`
  );
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

export const getAllClient = async () => {
  const { data, status } = await axiosClient.get<ResGetAllClient>(
    URL + `/api/person/all`
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

export const createProjectByAdmin = async (value: {
  email: string;
  name: string;
  tariffId: number;
  period: number;
  price: number;
}) => {
  const { data, status } = await axiosClient.post(URL + `/api/project/buy`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const registration = async (value: {
  email: string;
  password: string;
}) => {
  const { data, status } = await axiosClient.post(
    URL + `/api/user/clientRegistration`,
    {
      ...value,
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
  isActive: boolean,
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
