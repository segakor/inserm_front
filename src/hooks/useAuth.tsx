import React, { useState } from "react";
import axios from "axios";
import { openNotificationWithIcon } from "../utils/notification";
import { ResLogin, ReqLogin } from '../type';
import { useNavigate } from "react-router-dom"
import { login } from '../request'


export const useAuth = () => {

  const navigate = useNavigate()

  const handleLogin = async (value: ReqLogin) => {
    try {
      const response = await login(value)
      localStorage.setItem("loginData", JSON.stringify(response.data))
      //TODO: сетить начальную страницу в зависимости от роли
      navigate(`/${response.data.role?.toLowerCase()}`)

    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Неверный emal или пароль",
      })
    }
  }

  const checkAuth = () => {
    console.log('checkAuth');
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

  const handleLogout = () => {
    localStorage.removeItem("loginData")
    navigate('/login')
  }



  return { handleLogin, checkAuth, handleLogout }
}