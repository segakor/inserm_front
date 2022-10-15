import React, { useState } from "react";
import styled from "styled-components";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ReactComponent as ProjectIcon } from "../assets/project.svg";
import { ReactComponent as TariffIcon } from "../assets/tariff.svg";
import { ReactComponent as ProfileIcon } from "../assets/profile.svg";
import { ReactComponent as FoundationIcon } from "../assets/foundation.svg";
import { ReactComponent as ContactsIcon } from "../assets/contacts.svg";
import { ReactComponent as HelpIcon } from "../assets/help.svg";
import { ReactComponent as ExitIcon } from "../assets/exit.svg";
import { useNavigate } from "react-router-dom";

type Props = {
  onHeaderClose?: () => void;
};

export const MenuComponent = ({ onHeaderClose }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState([""]);

  const navigation = useNavigate();

  const dividerItem = {
    type: "divider",
    className: "dividerItem-1",
    style: {
      border: "2px solid #F0F0F0",
      margin: "1px 24px",
    },
  };

  const dividerItem2 = {
    type: "divider",
    className: "dividerItem-2",
    style: {
      border: "2px solid #F0F0F0",
      margin: "70px 24px",
    },
  };

  const items3: MenuProps["items"] = [
    {
      label: "Мои проекты",
      key: "project",
      icon: <ProjectIcon />,
      onTitleClick: () => {
        navigation(`/project`);
        setSelectedKeys([""]);
      },
      children: [
        { label: "коты", key: "1" },
        { label: "собаки", key: "2" },
      ],
    },
    { label: "Управление тарифами", key: "tariff", icon: <TariffIcon /> },
    dividerItem as any,
    { label: "Профиль", key: "profile", icon: <ProfileIcon /> },
    { label: "База знаний", key: "foundation", icon: <FoundationIcon /> },
    { label: "Контакты", key: "contacts", icon: <ContactsIcon /> },
    dividerItem2 as any,
    { label: "Нужна помощь?", key: "help", icon: <HelpIcon /> },
    { label: "Выход", key: "exit", icon: <ExitIcon /> },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    /*   console.log(e); */

    setSelectedKeys(e.keyPath);

    switch (true) {
      case e.keyPath.length === 2:
        navigation(`/project/${e.key}`);
        break;
      case e.key === "exit":
        alert("exit");
        break;
      default:
        navigation(`${e.key}`);
        break;
    }

    if (onHeaderClose) {
      onHeaderClose();
    }
  };

  return (
    <Menu
      onClick={onClick}
      items={items3}
      mode="inline"
      selectedKeys={selectedKeys}
    />
  );
};
