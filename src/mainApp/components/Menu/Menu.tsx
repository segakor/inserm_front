import React, { useState, useEffect } from "react";
import { Badge, MenuProps } from "antd";
import { Menu } from "antd";

import { ExclamationCircleFilled, SignalFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useLocalState } from "../../context/hooks";
import { useAuth } from "../../hooks/useAuth";
import { useGetProject } from "../../hooks/useGetProject";
import { clearState } from "../../context/action";
import { tokenService } from "../../../utils/tokenService";
import { useIOSocketNotify } from "../../hooks/useIOSocketNotify";
import { notificationTitle } from "../../../utils/notificationTitle";
import { useGetCampaign } from "../../hooks/useGetCampaign";
import {
  ContactsIcon,
  CreateadminIcon,
  ExitIcon,
  FoundationIcon,
  HelpIcon,
  PaidreviewsIcon,
  ProfileIcon,
  ProjectCheckIcon,
  ProjectIcon,
  ReviewsforpaymentIcon,
  SettingIcon,
  TariffIcon,
} from "./MenuIcon";

type Props = {
  onHeaderClose?: () => void;
};

export const SocketNotify = () => {
  useIOSocketNotify();
  return <></>;
};

export const MenuComponent = ({ onHeaderClose }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState([""]);

  const navigation = useNavigate();

  const state = useLocalState();

  const { handleLogout } = useAuth();

  const role = tokenService.getRole();
  const auth = tokenService.getIsAuth();

  const { handleGetClientProject } = useGetProject();
  const { handleGetCampaign } = useGetCampaign();

  const dispatch = useDispatch();

  useEffect(() => {
    if (role === "CLIENT") {
      handleGetClientProject();
      handleGetCampaign();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const { clientProject, clientCampaign, listOfNotify } = state;

  const notifyCount = listOfNotify
    ?.map((item: any) => item.unread)
    ?.reduce((a: any, b: any) => a + b, 0);

  notificationTitle(notifyCount);

  const allProject = [clientCampaign, clientProject].flat();

  const projectItem = allProject?.map((item, index) => ({
    label: item?.name,
    key: index,
    id: item?.id,
    type: item?.type,
    icon: !item?.brief && (
      <ExclamationCircleFilled style={{ color: "#FF0000" }} />
    ),
  }));

  const navigateProjectItem = (keyItem: number) => {
    const item = projectItem.find((item) => item.key === keyItem);
    return {
      projectId: item?.id,
      type: item?.type,
    };
  };

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
      children: projectItem || [],
    },
    { label: "Управление тарифами", key: "tariff", icon: <TariffIcon /> },
    dividerItem as any,
    { label: "Профиль", key: "profile", icon: <ProfileIcon /> },
    { label: "База знаний", key: "foundation", icon: <FoundationIcon /> },
    { label: "Контакты", key: "contacts", icon: <ContactsIcon /> },
    dividerItem2 as any,
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gridGap: "5px" }}>
          Техподдержка <Badge count={notifyCount} />
        </div>
      ),
      key: "help",
      icon: <HelpIcon />,
    },
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
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gridGap: "5px" }}>
          Вопросы клиентов <Badge count={notifyCount} />
        </div>
      ),
      key: "clientquestions",
      icon: <HelpIcon />,
    },
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
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gridGap: "5px" }}>
          Вопросы клиентов <Badge count={notifyCount} />
        </div>
      ),
      key: "clientquestions",
      icon: <HelpIcon />,
    },
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
    {
      label: "Статистика",
      key: "hoststatistics",
      icon: <SignalFilled style={{ color: "#1579E9" }} />,
    },
    dividerItem as any,
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gridGap: "5px" }}>
          Вопросы клиентов <Badge count={notifyCount} />
        </div>
      ),
      key: "clientquestions",
      icon: <HelpIcon />,
    },
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
        const { projectId, type } = navigateProjectItem(Number(e.key));
        navigation(`/app/client/${type}/${projectId}`);
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
        <>
          <SocketNotify />
          <Menu
            onClick={onClick}
            items={setItem()}
            mode="inline"
            selectedKeys={selectedKeys}
            /* defaultOpenKeys={["projects"]} */
          />
        </>
      ) : null}
    </>
  );
};
