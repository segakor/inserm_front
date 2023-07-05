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
import { demoProject, demoCampaign } from "../constants";
import styled from "styled-components";

type Props = {
  onHeaderClose?: () => void;
};

const StyledMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 120px);
`;

export const MenuComponentDemo = ({ onHeaderClose }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState([""]);

  const navigation = useNavigate();

  const clientProject = demoProject;
  const clientCampaign = demoCampaign;

  const allProject = [clientProject, clientCampaign].flat();

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
    { label: "База знаний", key: "foundation", icon: <FoundationIcon /> },
    { label: "Контакты", key: "contacts", icon: <ContactsIcon /> },
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

  const LinkTg = (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        margin: "50px 0 30px 0",
      }}
    >
      <>
        Подпишитесь на телеграм канал{" "}
        <a target="_blank" href="https://t.me/inserm">
          INSERM | Сервис по заказу отзывов
        </a>
      </>
    </div>
  );

  return (
    <StyledMenuContainer>
      <Menu
        onClick={onClick}
        items={itemClient}
        mode="inline"
        selectedKeys={selectedKeys}
      />
      <div>
        {LinkTg}
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
