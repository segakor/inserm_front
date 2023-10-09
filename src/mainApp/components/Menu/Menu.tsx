import { useState, useEffect } from "react";
import { Badge, MenuProps } from "antd";
import { Menu } from "antd";

import {
  ExclamationCircleFilled,
  SignalFilled,
  GiftFilled,
} from "@ant-design/icons";
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
  ReferralIcon,
  ReviewsforpaymentIcon,
  SettingIcon,
  TariffIcon,
} from "./MenuIcon";
import styled from "styled-components";
import { ButtonCreateIdea } from "../../Button/ButtonCreateIdea";

type Props = {
  onHeaderClose?: () => void;
};

export const SocketNotify = () => {
  useIOSocketNotify();
  return <></>;
};

const StyledMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 120px);
`;

export const MenuComponent = ({ onHeaderClose }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState([""]);

  const navigation = useNavigate();

  const state = useLocalState();

  const { handleLogout } = useAuth();

  const role = tokenService.getRole();
  const auth = tokenService.getIsAuth();
  const isAdminRole = tokenService.getIsAdmin();

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
    disabled: !item?.isPaid && item?.type === "campaign" ? true : false,
  }));

  const navigateProjectItem = (keyItem: number) => {
    const item = projectItem.find((item) => item.key === keyItem);
    return {
      projectId: item?.id,
      type: item?.type,
    };
  };

  const itemsBottom: MenuProps["items"] = [
    {
      type: "divider",
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gridGap: "5px" }}>
          Техподдержка <Badge count={notifyCount} />
        </div>
      ),
      key: role === "CLIENT" ? "help" : "clientquestions",
      icon: <HelpIcon />,
    },
    { label: "Выход", key: "exit", icon: <ExitIcon /> },
  ];

  const filteredItemsBottom =
    role !== "HOST"
      ? itemsBottom
      : itemsBottom.filter((item) => item?.key !== "clientquestions");

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
    { label: "Профиль", key: "profile", icon: <ProfileIcon /> },
    { label: "База знаний", key: "foundation", icon: <FoundationIcon /> },
    { label: "Контакты", key: "contacts", icon: <ContactsIcon /> },
    /* { label: "Партнерская программа", key: "referral", icon: <ReferralIcon /> }, */ //TODO: включить по готовности
  ];

  const itemHost: MenuProps["items"] = [
    { label: "Список проектов", key: "projects", icon: <ProjectIcon /> },
    { label: "Общая база клиентов", key: "clientbase", icon: <ProfileIcon /> },
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
    {
      label: "Статистика",
      key: "hoststatistics",
      icon: <SignalFilled style={{ color: "#1579E9" }} />,
    },
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
    {
      label: "Промокоды",
      key: "promo",
      icon: <GiftFilled style={{ color: "#1579E9" }} />,
    },
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
        navigation(`${isAdminRole ? "admin" : "client"}/${e.key}`);
        break;
    }

    if (onHeaderClose) {
      onHeaderClose();
    }
  };

  const LinkTg =
    role === "CLIENT" ? (
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          margin: "50px 0 30px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ButtonCreateIdea />
        <div>
          Подпишитесь на телеграм канал{" "}
          <a target="_blank" href="https://t.me/inserm">
            INSERM | Сервис по заказу отзывов
          </a>
        </div>
      </div>
    ) : null;

  return (
    <>
      {auth ? (
        <StyledMenuContainer>
          <SocketNotify />
          <Menu
            onClick={onClick}
            items={setItem()}
            mode="inline"
            selectedKeys={selectedKeys}
          />
          <div>
            {LinkTg}
            <Menu
              onClick={onClick}
              mode="inline"
              selectedKeys={selectedKeys}
              items={filteredItemsBottom}
            />
          </div>
        </StyledMenuContainer>
      ) : null}
    </>
  );
};
