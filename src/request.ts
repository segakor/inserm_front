import axios from "axios";
import {
  ReqLogin,
  ResLogin,
  ReqChangePassword,
  Person,
  ReqPersonChange,
  ReqGetProject,
  ReqGetDetails,
  ReqBrief
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
  const { data, status } = await axios.get<ReqGetDetails>(URL + `/project/${id}`);
  return { data, status };
};

export const getAllProject = async () => {
  const { data, status } = await axios.get<ReqGetProject>(URL + `/project/all`);
  return { data, status };
}

export const sendBrief = async (value: ReqBrief) => {
  const { data, status } = await axios.post(URL + `/project/brief`, {
    ...value
  });
  return { data, status };
}