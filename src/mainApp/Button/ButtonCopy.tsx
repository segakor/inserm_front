import React from "react";
import { Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";

type Props = {
  onClick: () => void;
  style?: React.CSSProperties;
};

export const ButtonCopy = ({ onClick, style }: Props) => {
  return (
    <Button
      size="small"
      onClick={(e:React.MouseEvent<HTMLElement>) => {
        onClick();
        e.stopPropagation();
      }}
      style={style}
    >
      <CopyOutlined />
    </Button>
  );
};
