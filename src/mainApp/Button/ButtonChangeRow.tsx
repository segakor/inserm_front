import React from "react";
import { Button } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { ButtonChangeRowWrapper } from "./styles";
import { useLocation } from "react-router-dom";

type Props = {
  onClick: () => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  isEdit: boolean;
};

export const ButtonChangeRow = ({
  onClick,
  onClickSave,
  onClickCancel,
  isEdit,
}: Props) => {
  const location = useLocation();

  if (location.pathname.split('/').includes('demo')) return null
  
  return (
    <ButtonChangeRowWrapper>
      {!isEdit && (
        <Button
          size="small"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            onClick();
            e.stopPropagation();
          }}
        >
          <EditOutlined />
        </Button>
      )}
      {isEdit && (
        <>
          <Button
            style={{ color: "green" }}
            size="small"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              onClickSave();
              e.stopPropagation();
            }}
          >
            <SaveOutlined />
          </Button>
          <Button
            style={{ color: "red" }}
            size="small"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              onClickCancel();
              e.stopPropagation();
            }}
          >
            <CloseOutlined />
          </Button>
        </>
      )}
    </ButtonChangeRowWrapper>
  );
};
