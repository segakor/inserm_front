import styled from "styled-components";
import { Title } from "../../../common/Typography";
import { AlignRightOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { Room } from "../../../types";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 65px;
  background: #1579e9;
  border-radius: 10px 10px 0px 0px;
  padding: 20px;
  & h5,
  div {
    color: white !important;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const User = styled.div`
  padding: 10px 20px 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

type Props = {
  room: Room | null;
};

export const RoomItemHeader = ({ room }: Props) => {
  const navigation = useNavigate();

  const projects = room?.projects?.map((item) => ({
    ...item,
    type: "project",
  }));

  const campaigns = room?.campaigns?.map((item) => ({
    ...item,
    type: "campaign",
  }));

  const allProjects = [...(projects || []), ...(campaigns || [])].map(
    (item, index) => ({ ...item, key: index })
  );

  const items: MenuProps["items"] = allProjects?.map((item) => ({
    key: item.key,
    label: <div>{item.name}</div>,
  }));

  const handleDropdownItemClick = (e: any) => {
    const target = allProjects.find((item) => item.key == e.key);
    navigation(`/app/admin/${target?.type}/${target?.id}`);
  };
  return (
    <Wrapper>
      <div>
        <Title level={5} style={{ fontSize: 18, width: 280 }}>
          Список чатов
        </Title>
      </div>
      <User>
        <div>
          <Title level={5}>{room?.name}</Title>
          <div style={{ color: "#8E8E8E" }}>{room?.email}</div>
        </div>
        {!!allProjects.length && (
          <Dropdown menu={{ items, onClick: handleDropdownItemClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Title level={5}>Проекты</Title>
                <AlignRightOutlined />
              </Space>
            </a>
          </Dropdown>
        )}
      </User>
    </Wrapper>
  );
};
