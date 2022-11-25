import React, { useState } from "react";
import axios from "axios";
import { openNotificationWithIcon } from "../utils/notification";
import { ResLogin } from '../type';


export const useAuth = () => {

  const handleLogin = async (value: ResLogin) => {
    try {

      const response = await axios.post('http://188.93.211.180:5001/api/user/login', { ...value })

    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Неверный пароль или email",
      })
    }
  }


  return handleLogin;
}