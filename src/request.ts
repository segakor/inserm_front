import axios from "axios";
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
  ResCreateBrief
} from "./type";

const URL = "https://lul.inserm.ru:5001/api";

export const login = async (value: ReqLogin) => {
  const { data, status } = await axios.post<ResLogin>(URL + "/user/login", {
    ...value,
  });
  return { data, status };
};

export const changePassword = async (value: ReqChangePassword) => {
  const { data, status } = await axios.post(URL + "/user/changePassword", {
    ...value,
  });
  return { data, status };
};

export const getPerson = async () => {
  const { data, status } = await axios.get<Person>(URL + "/person");
  return { data, status };
};

export const changePerson = async (value: ReqPersonChange) => {
  const { data, status } = await axios.post(URL + "/person/change", {
    ...value,
  });
  return { data, status };
};

export const getProject = async () => {
  const { data, status } = await axios.get<ReqGetProject>(URL + "/project");
  return { data, status };
};

export const getTariff = async () => {
  const { data, status } = await axios.get(URL + "/project");
  return { data, status };
};

export const getDetails = async (id: string) => {
  const { data, status } = await axios.get<ReqGetDetails>(
    URL + `/project/${id}`
  );
  return { data, status };
};

export const getAllProject = async () => {
  const { data, status } = await axios.get<ReqGetProject>(URL + `/project/all`);
  return { data, status };
};

export const getAllTariff = async () => {
  const { data, status } = await axios.get<ReqGetTariff>(URL + `/tariff`);
  return { data, status };
};

export const getArchiveProject = async (id: string) => {
  const { data, status } = await axios.get<ReqArchiveProject>(
    URL + `/archive/${id}`
  );
  return {
    data,
    status,
  };
};

export const getArchiveDetails = async (id: string) => {
  const { data, status } = await axios.get<ReqArchiveDetail>(
    URL + `/archive/detail/${id}`
  );
  return {
    data,
    status,
  };
};

export const getBrief = async (id: string) => {
  const { data, status } = await axios.get<ReqGetBrief>(URL + `/brief/${id}`);
  return {
    data,
    status,
  };
};

export const createBrief = async (value: ReqCreateBrief) => {
  const { data, status } = await axios.post<ResCreateBrief>(URL + `/brief/create`, { ...value });
  return {
    data,
    status,
  };
}
export const updateBrief = async (value: ReqCreateBrief) => {
  const { data, status } = await axios.post<ResCreateBrief>(URL + `/brief/update`, { ...value });
  return {
    data,
    status,
  };
}

export const updateReview = async (value: Reviews) => {
  const { data, status } = await axios.post(URL + `/review/update`, {
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
  const { data, status } = await axios.post(URL + `/review/create`, {
    ...value,
  });
  return {
    data,
    status,
  };
};

export const getReviewsWithType = async (type: "moderate" | "isPaid" | "noPaid") => {
  const { data, status } = await axios.get<ReqGetReviewsWithType>(URL + `/review/${type}`);
  return {
    data,
    status,
  };
};
