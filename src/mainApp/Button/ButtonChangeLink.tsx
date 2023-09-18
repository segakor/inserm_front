import React from "react";
import { Button } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

type Props = {
  onClick: () => void;
  style?: React.CSSProperties;
  type: "edit" | "save" | "cancel";
};

export const ButtonChangeLink = ({ onClick, style, type }: Props) => {
  return (
    <Button
      size="small"
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        onClick();
        e.stopPropagation();
      }}
      style={style}
    >
      {type === "edit" && <EditOutlined />}
      {type === "save" && <SaveOutlined />}
      {type === "cancel" && <CloseOutlined />}
    </Button>
  );
};
