import { axiosClient } from "./axios";
import {
  ReqLogin,
  ResLogin,
  ReqChangePassword,
  Person,
  ReqPersonChange,
  ReqGetProject,
  ReqGetDetails,
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
} from "./type";

const URL = "https://lul.inserm.ru:5001/api";

export const login = async (value: ReqLogin) => {
  const { data, status } = await axiosClient.post<ResLogin>(
    URL + "/user/login",
    {
      ...value,
    }
  );
  return { data, status };
};

export const changePassword = async (value: ReqChangePassword) => {
  const { data, status } = await axiosClient.post(
    URL + "/user/changePassword",
    {
      ...value,
    }
  );
  return { data, status };
};

export const getPerson = async () => {
  const { data, status } = await axiosClient.get<Person>(URL + "/person");
  return { data, status };
};

export const changePerson = async (value: ReqPersonChange) => {
  const { data, status } = await axiosClient.post(URL + "/person/change", {
    ...value,
  });
  return { data, status };
};

export const getProject = async () => {
  const { data, status } = await axiosClient.get<ReqGetProject>(
    URL + "/project"
  );
  return { data, status };
};

export const getTariff = async () => {
  const { data, status } = await axiosClient.get(URL + "/project");
  return { data, status };
};

export const getDetails = async (id: string) => {
  const { data, status } = await axiosClient.get<ReqGetDetails>(
    URL + `/project/${id}`
  );
  return { data, status };
};

export const getAllProject = async (isActive: boolean) => {
  const { data, status } = await axiosClient.get<ReqGetProject>(
    URL + `/project/all`,
    { params: { isActive: isActive } }
  );
  return { data, status };
};

export const getAllTariff = async () => {
  const { data, status } = await axiosClient.get<ReqGetTariff>(URL + `/tariff`);
  return { data, status };
};

export const getArchiveProject = async (id: string) => {
  const { data, status } = await axiosClient.get<ReqArchiveProject>(
    URL + `/archive/${id}`
  );
  return {
    data,
    status,
  };
};

export const getArchiveDetails = async (id: string) => {
  const { data, status } = await axiosClient.get<ReqArchiveDetail>(
    URL + `/archive/detail/${id}`
  );
  return {
    data,
    status,
  };
};

export const getBrief = async (id: string) => {
  const { data, status } = await axiosClient.get<ReqGetBrief>(
    URL + `/brief/${id}`
  );
  return {
    data,
    status,
  };
};

export const createBrief = async (value: ReqCreateBrief) => {
  const { data, status } = await axiosClient.post<ResCreateBrief>(
    URL + `/brief/create`,
    { ...value }
  );
  return {
    data,
    status,
  };
};
export const updateBrief = async (value: ReqCreateBrief) => {
  const { data, status } = await axiosClient.post<ResCreateBrief>(
    URL + `/brief/update`,
    { ...value }
  );
  return {
    data,
    status,
  };
};

export const updateReview = async (value: Reviews) => {
  const { data, status } = await axiosClient.post(URL + `/review/update`, {
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
  projectId: number;
}) => {
  //TODO:Тип ответа!
  const { data, status } = await axiosClient.post(URL + `/review/create`, {
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
    URL + `/review/${type}`
  );
  return {
    data,
    status,
  };
};

export const createProject = async (value: ReqProjectCreate) => {
  const { data, status } = await axiosClient.post<ReqGetReviewsWithType>(
    URL + `/project/create`,
    { ...value }
  );
  return {
    data,
    status,
  };
};

export const createAdmin = async (value: ReqCreateAdmin) => {
  const { data, status } = await axiosClient.post(URL + `/user/registration`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const getAdmin = async () => {
  const { data, status } = await axiosClient.get<ResAdmin>(
    URL + `/user/workers`
  );
  return {
    data,
    status,
  };
};

export const createUserFromSite = async (value: ReqSiteRegistration) => {
  const { data, status } = await axiosClient.post(
    URL + `/user/siteRegistration`,
    { ...value }
  );
  return {
    data,
    status,
  };
};
export const updateAdmin = async (value: Admin) => {
  const { data, status } = await axiosClient.post(URL + `/user/update`, {
    ...value,
  });
  return {
    data,
    status,
  };
};
export const deleteAdmin = async (value: { email: string }) => {
  const { data, status } = await axiosClient.post(URL + `/user/delete`, {
    ...value,
  });
  return {
    data,
    status,
  };
};
export const resetPassword = async (value: { email: string }) => {
  const { data, status } = await axiosClient.post(URL + `/user/resetPassword`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const refreshToken = async (value: { refreshToken: string }) => {
  const { data, status } = await axiosClient.post<ResLogin>(
    URL + `/user/auth`,
    { ...value }
  );
  return {
    data,
    status,
  };
};

export const unsubdcribe = async (value: { projectId: number }) => {
  const { data, status } = await axiosClient.post(URL + `/tariff/unsubscribe`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const createNote = async (value: {
  projectId: string;
  text: string;
}) => {
  const { data, status } = await axiosClient.post(URL + `/project/notes`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const getNotes = async (id: string) => {
  const { data, status } = await axiosClient.get<ReqNote>(
    URL + `/project/notes/${id}`
  );
  return {
    data,
    status,
  };
};

export const getRooms = async () => {
  const { data, status } = await axiosClient.get<ReqRooms>(URL + `/chat/rooms`);
  return {
    data,
    status,
  };
};

export const createRoom = async () => {
  const { data, status } = await axiosClient.get<{ roomId: number }>(
    URL + `/chat/create`
  );
  return {
    data,
    status,
  };
};

export const deleteReview = async (value: { id: string }) => {
  const { data, status } = await axiosClient.post(URL + "/review/delete", {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const changeStatusProject = async (value: {
  id: number;
  isActive: boolean;
}) => {
  const { data, status } = await axiosClient.post(URL + "/project/status", {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const createReviewList = async (value: ReqCreateReviewList) => {
  //TODO:Тип ответа!
  const { data, status } = await axiosClient.post(URL + `/review/import`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const getAllClient = async () => {
  const { data, status } = await axiosClient.get<ResGetAllClient>(
    URL + `/person/all`
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
    URL + `/statistics`,
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
  const { data, status } = await axiosClient.post(URL + `/project/buy`, {
    ...value,
  });
  return {
    data,
    status,
  };
};
