import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../common/Typography";
import { Project } from "../../../types";
import { getRangeDate } from "../../../utils";
import { useChangeProjectStatus } from "../../hooks/useChangeProjectStatus";
import { Box, Panel } from "./styles";
import { StatusesFlat } from "./StatusesFlat";
import { confirmationText } from "../../../constants";
import { ModalСonfirmation } from "../Modal";
import { DollarTwoTone } from "@ant-design/icons";

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
    brief,
    autopay
  } = project;

  const navigation = useNavigate();

  const onNavigate = (e: React.MouseEvent<HTMLElement>) => {
    if (e.ctrlKey) {
      window.open(
        `/app/admin/project/${id}`,
        "_blank",
        "rel=noopener noreferrer"
      );
      return;
    }
    navigation(`/app/admin/project/${id}`);
  };

  const { handleChangeProjectStatus, isLoading } =
    useChangeProjectStatus("project");

  const onChangeStatus = () => {
    handleChangeProjectStatus({ id, isActive: !isActive }).then(() => {
      onUpdate();
      handleClose();
    });
  };

  const isCompleted = (statuses?.success || 0) >= (statuses?.all || 0);
  const isReadyToWork = statuses?.moderate === 0 && (brief as boolean);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    if (isActive) {
      setIsModalOpen(true);
    } else {
      onChangeStatus();
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Panel
        isReadyToWork={isReadyToWork}
        isCompleted={isCompleted}
        onClick={onNavigate}
      >
        <Box style={{ marginBottom: "15px" }}>
          <Title level={5} style={{ fontWeight: "800" }}>
            {`[${project.id}] `}
            {project.name}
            {autopay && (
              <DollarTwoTone
                twoToneColor="#52c41a"
                style={{ marginRight: "4px" }}
              />
            )}
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
              handleOpen();
            }}
          >
            {isActive ? "Добавить в архив" : "Убрать из архива"}
          </Title>
        </Box>
      </Panel>
      {isModalOpen && (
        <ModalСonfirmation
          onClose={handleClose}
          onConfirm={onChangeStatus}
          confirmationText={confirmationText.archiveProject}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
