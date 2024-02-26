import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ReactComponent as ProjectIcon } from "../../assets/project.svg";
import { ReactComponent as TariffIcon } from "../../assets/tariff.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import { ReactComponent as ContactsIcon } from "../../assets/contacts.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";
import { ReactComponent as ExitIcon } from "../../assets/exit.svg";
import { useNavigate } from "react-router-dom";
import { demoCampaign } from "../constants";
import styled from "styled-components";
import { BellFilled, BulbFilled } from "@ant-design/icons";
import { ButtonCreateIdeaDemo } from "./Button/ButtonCreateIdeaDemo";

type Props = {
  onHeaderClose?: () => void;
};

const StyledMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 120px);
`;

const WraperLinkAndIdea = styled.div`
  padding: 0 30px;
  margin: 50px 0 30px 0;
`;

const LinkTg = () => {
  return (
    <div>
      Подпишитесь на телеграм канал{" "}
      <a target="_blank" href="https://t.me/inserm">
        INSERM | Сервис по заказу отзывов
      </a>
    </div>
  );
};

export const MenuComponentDemo = ({ onHeaderClose }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState([""]);

  const navigation = useNavigate();
  const clientCampaign = demoCampaign;

  const allProject = [clientCampaign].flat();

  const projectItem = allProject?.map((item, index) => ({
    label: item?.name,
    key: index,
    id: item?.id,
    type: item?.type,
  }));

  const navigateProjectItem = (keyItem: number) => {
    const item = projectItem.find((item) => item.key === keyItem);
    return {
      projectId: item?.id,
      type: item?.type,
    };
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
      children: projectItem || [],
    },
    { label: "Управление тарифами", key: "tariff", icon: <TariffIcon /> },
    { label: "Профиль", key: "profile", icon: <ProfileIcon /> },
    { label: "Контакты", key: "contacts", icon: <ContactsIcon /> },
    {
      label: "Интеграция",
      key: "notify",
      icon: <BellFilled style={{ color: "#1579E9" }} />,
    },
    {
      label: "Обновления сервиса",
      key: "news",
      icon: <BulbFilled style={{ color: "#1579E9" }} />,
    },
  ];

  const itemsBottom: MenuProps["items"] = [
    {
      type: "divider",
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gridGap: "5px" }}>
          Техподдержка
        </div>
      ),
      key: "help",
      icon: <HelpIcon />,
    },
    { label: "Выход", key: "exit", icon: <ExitIcon /> },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKeys(e.keyPath);

    switch (true) {
      //список проектов
      case e.keyPath.length === 2:
        const { projectId, type } = navigateProjectItem(Number(e.key));
        navigation(`/demo/${type}/${projectId}`);
        break;
      case e.key === "exit":
        navigation(`/app/login`);
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
    <StyledMenuContainer>
      <Menu
        onClick={onClick}
        items={itemClient}
        mode="inline"
        selectedKeys={selectedKeys}
      />
      <div>
        <WraperLinkAndIdea>
          <ButtonCreateIdeaDemo />
          <LinkTg />
        </WraperLinkAndIdea>
        <Menu
          onClick={onClick}
          mode="inline"
          selectedKeys={selectedKeys}
          items={itemsBottom}
        />
      </div>
    </StyledMenuContainer>
  );
};
