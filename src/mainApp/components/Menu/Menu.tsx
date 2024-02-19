import { useState } from "react";
import { Badge, MenuProps } from "antd";
import { Menu } from "antd";
import {
  ExclamationCircleFilled,
  SignalFilled,
  GiftFilled,
  BulbFilled,
  BellFilled,
  MailFilled,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useLocalState } from "../../context/hooks";
import { useAuth } from "../../hooks/useAuth";
import { clearState } from "../../context/action";
import { tokenService } from "../../../utils/tokenService";
import { useIOSocketNotify } from "../../hooks/useIOSocketNotify";
import { notificationTitle } from "../../../utils/notificationTitle";
import {
  ContactsIcon,
  CreateadminIcon,
  ExitIcon,
  /* FoundationIcon, */
  HelpIcon,
  PaidreviewsIcon,
  ProfileIcon,
  ProjectCheckIcon,
  ProjectIcon,
  ReferralIcon,
  ReviewsforpaymentIcon,
  TariffIcon,
} from "./MenuIcon";
import styled from "styled-components";
import { LinkAndContacts, LinkAndIdea } from "./Components";

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

  const location = useLocation();

  const state = useLocalState();

  const { handleLogout } = useAuth();

  const role = tokenService.getRole();
  const auth = tokenService.getIsAuth();
  const isAdminRole = tokenService.getIsAdmin();
  const isClientRole = tokenService.getIsClient();
  const isPartnerRole = tokenService.getIsPartner();

  const dispatch = useDispatch();

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
      key: isClientRole || isPartnerRole ? "help" : "clientquestions",
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
        onHeaderClose?.();
        setSelectedKeys([""]);
      },
      children: projectItem || [],
    },
    { label: "Управление тарифами", key: "tariff", icon: <TariffIcon /> },
    { label: "Профиль", key: "profile", icon: <ProfileIcon /> },
    {
      label: "Интеграция",
      key: "notify",
      icon: <BellFilled style={{ color: "#1579E9" }} />,
    },
    /* { label: "База знаний", key: "foundation", icon: <FoundationIcon /> }, */ //TODO: включить после рефакторинга базы
    { label: "Контакты", key: "contacts", icon: <ContactsIcon /> },
    {
      label: "Обновления сервиса",
      key: "news",
      icon: <BulbFilled style={{ color: "#1579E9" }} />,
    },
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
      key: "statistics",
      icon: <SignalFilled style={{ color: "#1579E9" }} />,
    },
  ];

  const itemSupport: MenuProps["items"] = [
    { label: "Список проектов", key: "projects", icon: <ProjectIcon /> },
    { label: "Общая база клиентов", key: "clientbase", icon: <ProfileIcon /> },
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
      key: "statistics",
      icon: <SignalFilled style={{ color: "#1579E9" }} />,
    },
    {
      label: "Промокоды",
      key: "promo",
      icon: <GiftFilled style={{ color: "#1579E9" }} />,
    },
    {
      label: "Обновления сервиса",
      key: "news",
      icon: <BulbFilled style={{ color: "#1579E9" }} />,
    },
    {
      label: "Настройка писем",
      key: "mail",
      icon: <MailFilled style={{ color: "#1579E9" }} />,
    },
    {
      label: "Реферальная программа",
      key: "referral",
      icon: <ReferralIcon />,
    },
  ];

  const itemPartner = [
    {
      label: "Партнерская программа",
      key: "main",
      icon: <ReferralIcon />,
    },
    { label: "Профиль", key: "profile", icon: <ProfileIcon /> },
    { label: "Контакты", key: "contacts", icon: <ContactsIcon /> },
  ];

  const setItem = () => {
    const itemMap = {
      CLIENT: itemClient,
      HOST: itemHost,
      SUPERVISOR: itemSupervisor,
      SUPPORT: itemSupport,
      ADMIN: itemAdmin,
      PARTNER: itemPartner,
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
        onNavigate(e);
        break;
    }

    if (onHeaderClose) {
      onHeaderClose();
    }
  };

  const onNavigate = (e: any) => {
    if (e.domEvent.ctrlKey) {
      window.open(
        `/app/${isAdminRole ? "admin" : isClientRole ? "client" : "partner"}/${
          e.key
        }`,
        "_blank",
        "rel=noopener noreferrer"
      );
      return;
    }

    switch (true) {
      case isAdminRole:
        navigation(`admin/${e.key}`);
        break;
      case isClientRole:
        navigation(`client/${e.key}`);
        break;
      default:
        navigation(`partner/${e.key}`);
        break;
    }
  };

  if (location.pathname === "/app/payment") {
    return (
      <StyledMenuContainer>
        <LinkAndContacts />
      </StyledMenuContainer>
    );
  }

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
            style={{ borderInline: "none" }}
          />
          <div>
            <LinkAndIdea role={role} />
            <Menu
              onClick={onClick}
              mode="inline"
              selectedKeys={selectedKeys}
              items={filteredItemsBottom}
              style={{ borderInline: "none" }}
            />
          </div>
        </StyledMenuContainer>
      ) : null}
    </>
  );
};
