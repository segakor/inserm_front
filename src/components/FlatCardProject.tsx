import React from "react";
import styled from "styled-components";
import { Project } from "../type";
import { getRangeDate } from "../utils/getRangeDate";
import { Title } from "./Typography";

const Panel = styled.div`
  background: #ffffff;
  border-radius: 10px;
  min-height: 80px;
  padding: 12px 20px 12px 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
  :hover {
    background-color: whitesmoke;
  }
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Status = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;
const StatusRow = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const FlatCardProject = (project: Project) => {
  return (
    <>
      <Panel>
        <Box style={{ marginBottom: "15px" }}>
          <Title level={5} style={{ fontWeight: "800" }}>
            {project.name}
          </Title>
          <>{getRangeDate(project.tariff_start, project.tariff_end)}</>
        </Box>
        <Box>
          <Status>
            <>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                Опубликовано
              </Title>
              <>&ensp;-&ensp;</>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#1BBD3F",
                }}
              >
                {project.statuses?.success || 0}
              </Title>
              <>&ensp;|&ensp;</>
            </>
            <>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                Осталось
              </Title>
              <>&ensp;-&ensp;</>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#8567FF",
                }}
              >
                {project.statuses?.left || 0}
              </Title>
              <>&ensp;|&ensp;</>
            </>
            <>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                На модерации
              </Title>
              <>&ensp;-&ensp;</>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#5AA6FF",
                }}
              >
                {project.statuses?.moderate || 0}
              </Title>
              <>&ensp;|&ensp;</>
            </>
            <>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                Не прошло
              </Title>
              <>&ensp;-&ensp;</>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#FA7211",
                }}
              >
                {project.statuses?.reject || 0}
              </Title>
              <>&ensp;|&ensp;</>
            </>
            <>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                Удалено
              </Title>
              <>&ensp;-&ensp;</>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#FF1E1E",
                }}
              >
                {project.statuses?.delete || 0}
              </Title>
              <>&ensp;|&ensp;</>
            </>
            <>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                Всего
              </Title>
              <>&ensp;-&ensp;</>
              <Title style={{ fontSize: "14px", fontWeight: "800" }}>
                {project.statuses?.all || 0}
              </Title>
              <>&ensp;|&ensp;</>
            </>
          </Status>
          <StatusRow>
            <div>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                Опубликовано
              </Title>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#1BBD3F",
                }}
              >
                10
              </Title>
            </div>
            <div>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                Осталось
              </Title>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#8567FF",
                }}
              >
                10
              </Title>
            </div>
            <div>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                На модерации
              </Title>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#5AA6FF",
                }}
              >
                10
              </Title>
            </div>
            <div>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                Не прошло
              </Title>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#FA7211",
                }}
              >
                10
              </Title>
            </div>
            <div>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                Удалено
              </Title>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#FF1E1E",
                }}
              >
                10
              </Title>
            </div>
            <div>
              <Title
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8E8E",
                }}
              >
                Всего
              </Title>
              <Title style={{ fontSize: "14px", fontWeight: "800" }}>10</Title>
            </div>
          </StatusRow>
        </Box>
      </Panel>
    </>
  );
};
