import axios from "axios";
import {
  ReqLogin,
  ResLogin,
  ReqChangePassword,
  Person,
  ReqPersonChange,
  ReqGetProject,
} from "./type";

export const login = async (value: ReqLogin) => {
  const { data, status } = await axios.post<ResLogin>(
    "http://188.93.211.180:5001/api/user/login",
    { ...value }
  );
  return { data, status };
};

export const changePassword = async (value: ReqChangePassword) => {
  const { data, status } = await axios.post(
    "http://188.93.211.180:5001/api/user/changePassword",
    {
      ...value,
    }
  );
  return { data, status };
};

export const getPerson = async () => {
  const { data, status } = await axios.get<Person>(
    "http://188.93.211.180:5001/api/person"
  );
  return { data, status };
};

export const changePerson = async (value: ReqPersonChange) => {
  const { data, status } = await axios.post(
    "http://188.93.211.180:5001/api/person/change",
    {
      ...value,
    }
  );
  return { data, status };
};

export const getProject = async () => {
  const { data, status } = await axios.get<ReqGetProject>(
    "http://188.93.211.180:5001/api/project"
  );
  return { data, status };
};

export const getTariff = async () => {
  const { data, status } = await axios.get(
    "http://188.93.211.180:5001/api/project"
  );
  return { data, status };
};