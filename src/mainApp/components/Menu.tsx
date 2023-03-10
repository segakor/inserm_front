import React, { useState, useEffect } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ReactComponent as ProjectIcon } from "../../assets/project.svg";
import { ReactComponent as TariffIcon } from "../../assets/tariff.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import { ReactComponent as FoundationIcon } from "../../assets/foundation.svg";
import { ReactComponent as ContactsIcon } from "../../assets/contacts.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";
import { ReactComponent as ExitIcon } from "../../assets/exit.svg";
import { ReactComponent as ProjectCheckIcon } from "../../assets/projectcheck.svg";
import { ReactComponent as ReviewsforpaymentIcon } from "../../assets/reviewsforpayment.svg";
import { ReactComponent as SettingIcon } from "../../assets/setting.svg";
import { ReactComponent as PaidreviewsIcon } from "../../assets/paidreviews.svg";
import { ReactComponent as CreateadminIcon } from "../../assets/createadmin.svg";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useLocalState } from "../context/hooks";
import { useAuth } from "../hooks/useAuth";
import { useGetProject } from "../hooks/useGetProject";
import { clearState } from "../context/action";
import { tokenService } from "../../utils/tokenService";

type Props = {
  onHeaderClose?: () => void;
};

export const MenuComponent = ({ onHeaderClose }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState([""]);

  const navigation = useNavigate();

  const state = useLocalState();

  const { handleLogout } = useAuth();

  const role = tokenService.getRole();
  const auth = tokenService.getIsAuth();

  const { handleGetClientProject } = useGetProject();

  const dispatch = useDispatch();

  useEffect(() => {
    if (role === "CLIENT") {
      handleGetClientProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const { clientProject } = state;

  const listOfProject = clientProject?.map((item) => ({
    label: item.name,
    key: item.id,
    icon: !item.brief && (
      <ExclamationCircleFilled style={{ color: "#FF0000" }} />
    ),
  }));

  const dividerItem = {
    type: "divider",
    className: "dividerItem-1",
    style: {
      border: "1px solid #F0F0F0",
      margin: "1px 24px",
    },
  };

  const dividerItem2 = {
    type: "divider",
    className: "dividerItem-2",
    style: {
      border: "1px solid #F0F0F0",
      margin: "70px 24px",
    },
  };

  const itemClient: MenuProps["items"] = [
    {
      label: "Мои проекты",
      key: "projects",
      icon: <ProjectIcon />,
      onTitleClick: () => {
        navigation(`/app/client/projects`);
        setSelectedKeys([""]);
      },
      children: listOfProject || [],
    },
    { label: "Управление тарифами", key: "tariff", icon: <TariffIcon /> },
    dividerItem as any,
    { label: "Профиль", key: "profile", icon: <ProfileIcon /> },
    { label: "База знаний", key: "foundation", icon: <FoundationIcon /> },
    { label: "Контакты", key: "contacts", icon: <ContactsIcon /> },
    dividerItem2 as any,
    { label: "Техподдержка", key: "help", icon: <HelpIcon /> },
    { label: "Выход", key: "exit", icon: <ExitIcon /> },
  ];

  const itemHost: MenuProps["items"] = [
    { label: "Список проектов", key: "projects", icon: <ProjectIcon /> },
    { label: "Общая база клиентов", key: "clientbase", icon: <ProfileIcon /> },
    dividerItem2 as any,
    { label: "Выход", key: "exit", icon: <ExitIcon /> },
  ];

  const itemSupervisor: MenuProps["items"] = [
    { label: "Список проектов", key: "projects", icon: <ProjectIcon /> },
    {
      label: "Проекты на модерации",
      key: "projectmoderate",
      icon: <ProjectCheckIcon />,
    },
    {
      label: "Отзывы на оплату",
      key: "projectforpayment",
      icon: <ReviewsforpaymentIcon />,
    },
    {
      label: "Оплаченные отзывы",
      key: "projectpaid",
      icon: <PaidreviewsIcon />,
    },
    { label: "Общая база клиентов", key: "clientbase", icon: <ProfileIcon /> },
    dividerItem2 as any,
    { label: "Вопросы клиентов", key: "clientquestions", icon: <HelpIcon /> },
    { label: "Выход", key: "exit", icon: <ExitIcon /> },
  ];

  const itemSupport: MenuProps["items"] = [
    { label: "Список проектов", key: "projects", icon: <ProjectIcon /> },
    { label: "Общая база клиентов", key: "clientbase", icon: <ProfileIcon /> },
    {
      label: "Замена и создание \n нового тарифа",
      key: "settingtariff",
      icon: <SettingIcon />,
      style: { whiteSpace: "normal", lineHeight: "20px" },
    },
    dividerItem2 as any,
    { label: "Вопросы клиентов", key: "clientquestions", icon: <HelpIcon /> },
    { label: "Выход", key: "exit", icon: <ExitIcon /> },
  ];
  const itemAdmin: MenuProps["items"] = [
    { label: "Список проектов", key: "projects", icon: <ProjectIcon /> },
    {
      label: "Проекты на модерации",
      key: "projectmoderate",
      icon: <ProjectCheckIcon />,
    },
    {
      label: "Отзывы на оплату",
      key: "projectforpayment",
      icon: <ReviewsforpaymentIcon />,
    },
    {
      label: "Оплаченные отзывы",
      key: "projectpaid",
      icon: <PaidreviewsIcon />,
    },
    { label: "Общая база клиентов", key: "clientbase", icon: <ProfileIcon /> },
    { label: "Тарифы клиентов", key: "clienttariff", icon: <TariffIcon /> },
    { label: "База знаний", key: "foundation", icon: <FoundationIcon /> },
    {
      label: "Замена и создание \n нового тарифа",
      key: "settingtariff",
      icon: <SettingIcon />,
      style: { whiteSpace: "normal", lineHeight: "20px" },
    },
    {
      label: "Создание админов",
      key: "createadmin",
      icon: <CreateadminIcon />,
    },
    dividerItem as any,
    { label: "Вопросы клиентов", key: "clientquestions", icon: <HelpIcon /> },
    { label: "Выход", key: "exit", icon: <ExitIcon /> },
  ];

  const setItem = () => {
    const itemMap = {
      CLIENT: itemClient,
      HOST: itemHost,
      SUPERVISOR: itemSupervisor,
      SUPPORT: itemSupport,
      ADMIN: itemAdmin,
    };

    return itemMap[role || "CLIENT"];
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKeys(e.keyPath);

    switch (true) {
      //список проектов
      case e.keyPath.length === 2:
        navigation(`/app/client/project/${e.key}`);
        break;
      case e.key === "exit":
        setSelectedKeys([]);
        handleLogout();
        dispatch(clearState());
        break;
      default:
        navigation(`${role?.toLowerCase()}/${e.key}`);
        break;
    }

    if (onHeaderClose) {
      onHeaderClose();
    }
  };

  return (
    <>
      {auth ? (
        <Menu
          onClick={onClick}
          items={setItem()}
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={["projects"]}
        />
      ) : null}
    </>
  );
};
