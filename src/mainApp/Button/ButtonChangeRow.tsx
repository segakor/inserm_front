import React from "react";
import { Button } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { ButtonChangeRowWrapper } from "./styles";

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
