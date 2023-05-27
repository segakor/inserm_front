import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../common/Typography";
import { Project } from "../../../types";
import { tokenService, getRangeDate } from "../../../utils";
import { useChangeProjectStatus } from "../../hooks/useChangeProjectStatus";
import { Box, Panel, Status, StatusRow } from "./styles";

type Props = {
  project: Project;
  isActive: boolean;
  onUpdate: () => void;
};

export const FlatCardProject = ({ project, isActive, onUpdate }: Props) => {
  const {
    tariff: { start, end },
    statuses,
    id,
  } = project;

  const navigation = useNavigate();
  const role = tokenService.getRole();

  const { handleChangeProjectStatus } = useChangeProjectStatus();

  const onChangeStatus = () => {
    handleChangeProjectStatus({ id, isActive: !isActive }).then(() => {
      onUpdate();
    });
  };

  const isCompleted = (statuses?.success || 0) >= (statuses?.all || 0);

  return (
    <>
      <Panel
        isCompleted={isCompleted}
        onClick={() => navigation(`/app/${role?.toLowerCase()}/project/${id}`)}
      >
        <Box style={{ marginBottom: "15px" }}>
          <Title level={5} style={{ fontWeight: "800" }}>
            {`[${project.id}] `}
            {project.name}
          </Title>
          <>{getRangeDate({ start, end })}</>
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
                {statuses?.success || 0}
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
                {statuses?.left || 0}
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
                {statuses?.moderate || 0}
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
                {statuses?.reject || 0}
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
                {statuses?.delete || 0}
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
                {statuses?.all || 0}
              </Title>
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
                {statuses?.success || 0}
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
                {statuses?.left || 0}
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
                {statuses?.moderate || 0}
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
                {statuses?.reject || 0}
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
                {statuses?.delete || 0}
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
              <Title style={{ fontSize: "14px", fontWeight: "800" }}>
                {statuses?.all || 0}
              </Title>
            </div>
          </StatusRow>
          <Title
            style={{
              fontSize: "14px",
              color: "#8E8E8E",
              textDecorationLine: "underline",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onChangeStatus();
            }}
          >
            {isActive ? "Добавить в архив" : "Убрать из архива"}
          </Title>
        </Box>
      </Panel>
    </>
  );
};
