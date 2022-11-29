import axios from "axios";
import { ReqLogin, ResLogin, ReqChangePassword } from "./type";

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
