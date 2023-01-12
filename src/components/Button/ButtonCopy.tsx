import React from "react";
import { Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";

type Props = {
  onClick: () => void;
};

export const ButtonCopy = ({ onClick }: Props) => {
  return (
    <Button size="small" onClick={onClick} style={{ marginLeft: 10 }}>
      <CopyOutlined />
    </Button>
  );
};
