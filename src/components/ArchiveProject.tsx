import React from "react";
import styled from "styled-components";
import { Title } from "./Typography";
import { PlusCircleOutlined } from "@ant-design/icons";

const Wrapper = styled.div`
  border-radius: 10px;
  border: 1px solid red;
  background-color: #ffff;
  padding: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  div {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;
const DetailCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 17px;
`;

const Card = styled.div`
  border: 1px solid #8e8e8e;
  border-radius: 10px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  padding: 12px 20px 12px 20px;
  align-items: center;
`;

export const ArchiveProject = () => {
  return (
    <Wrapper>
      <Header>
        <Title
          style={{ fontSize: "14px", color: "#1579E9", fontWeight: "700" }}
        >
          01.08.22-31.08.22
        </Title>
        <HeaderAction>
          <div>
            <PlusCircleOutlined style={{ color: "#1579E9" }} />
          </div>
          <div>
            <Title style={{ fontSize: "14px", fontWeight: "700" }}>
              Смотреть отчет
            </Title>
          </div>
        </HeaderAction>
      </Header>
      <DetailCard>
        <Card>
          <Title
            style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "400" }}
          >
            Всего
          </Title>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>200</Title>
        </Card>
        <Card>
          <Title
            style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "400" }}
          >
            Опубликовано
          </Title>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>200</Title>
        </Card>
        <Card>
          <Title
            style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "400" }}
          >
            Не прошло
          </Title>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>200</Title>
        </Card>
        <Card>
          <Title
            style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "400" }}
          >
            Удалено
          </Title>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>200</Title>
        </Card>
      </DetailCard>
    </Wrapper>
  );
};
