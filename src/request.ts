import axios from "axios";
import {
  ReqLogin,
  ResLogin,
  ReqChangePassword,
  Person,
  ReqPersonChange,
  ReqGetProject,
} from "./type";

const URL = "https://lul.inserm.ru:5001/api";

export const login = async (value: ReqLogin) => {
  const { data, status } = await axios.post<ResLogin>(
    URL + "/user/login",
    { ...value }
  );
  return { data, status };
};

export const changePassword = async (value: ReqChangePassword) => {
  const { data, status } = await axios.post(
    URL + "/user/changePassword",
    {
      ...value,
    }
  );
  return { data, status };
};

export const getPerson = async () => {
  const { data, status } = await axios.get<Person>(
    URL + "/person"
  );
  return { data, status };
};

export const changePerson = async (value: ReqPersonChange) => {
  const { data, status } = await axios.post(
    URL + "/person/change",
    {
      ...value,
    }
  );
  return { data, status };
};

export const getProject = async () => {
  const { data, status } = await axios.get<ReqGetProject>(
    URL + "/project"
  );
  return { data, status };
};

export const getTariff = async () => {
  const { data, status } = await axios.get(
    URL + "/project"
  );
  return { data, status };
};