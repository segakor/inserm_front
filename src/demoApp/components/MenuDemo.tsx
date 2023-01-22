import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ReactComponent as ProjectIcon } from "../../assets/project.svg";
import { ReactComponent as TariffIcon } from "../../assets/tariff.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import { ReactComponent as FoundationIcon } from "../../assets/foundation.svg";
import { ReactComponent as ContactsIcon } from "../../assets/contacts.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";
import { ReactComponent as ExitIcon } from "../../assets/exit.svg";
import { useNavigate } from "react-router-dom";
import { demoProject } from '../constants'

type Props = {
  onHeaderClose?: () => void;
};

export const MenuComponentDemo = ({ onHeaderClose }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState([""]);

  const navigation = useNavigate();


  const clientProject = demoProject;

  const listOfProject = clientProject?.map((item) => ({
    label: item.name,
    key: item.id,
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
        navigation(`/demo/projects`);
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
    { label: "Нужна помощь?", key: "help", icon: <HelpIcon /> },
    { label: "Выход", key: "exit", icon: <ExitIcon /> },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKeys(e.keyPath);

    switch (true) {
      //список проектов
      case e.keyPath.length === 2:
        navigation(`/demo/project/${e.key}`);
        break;
      case e.key === "exit":
        setSelectedKeys([])
        break;
      default:
        navigation(`/demo/${e.key}`);
        break;
    }

    if (onHeaderClose) {
      onHeaderClose();
    }
  };

  return (
    <Menu
      onClick={onClick}
      items={itemClient}
      mode="inline"
      selectedKeys={selectedKeys}
    />
  );
};
