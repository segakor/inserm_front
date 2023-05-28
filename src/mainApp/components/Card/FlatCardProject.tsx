import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../common/Typography";
import { Project } from "../../../types";
import { tokenService, getRangeDate } from "../../../utils";
import { useChangeProjectStatus } from "../../hooks/useChangeProjectStatus";
import { Box, Panel } from "./styles";
import { StatusesFlat } from "./StatusesFlat";

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
          <StatusesFlat statuses={statuses} />
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
