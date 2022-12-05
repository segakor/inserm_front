import axios from "axios";
import { ResLogin } from '../type';

export const useAuthCheck = () => {
  let loginData: ResLogin = {
    role: null,
    token: ''
  }
  const _loginData = localStorage.getItem("loginData");
  if (_loginData) {
    loginData = JSON.parse(_loginData)
  }
  if (loginData.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${loginData.token}`
    return {
      auth: true,
      role: loginData.role,
      token: loginData.token
    }
  } else {
    return {
      auth: false,
      role: null,
      token: null
    }
  }
}