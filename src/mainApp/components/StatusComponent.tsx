import { Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";

import { ReactComponent as Success } from "../../assets/status_1.svg";
import { ReactComponent as Moderate } from "../../assets/status_2.svg";
import { ReactComponent as Delete } from "../../assets/status_3.svg";
import { ReactComponent as Reject } from "../../assets/status_4.svg";
import { ReactComponent as Wait } from "../../assets/status_5.svg";

//тут лучше айди в status
const statusMap = [
  {
    status: "success",
    label: "Опубликовано",
    icon: <CheckCircleOutlined />,
    icon_2: <Success />,
    color: "#1BBD3F",
  },
  {
    status: "moderate",
    label: "На модерации",
    icon: <PauseCircleOutlined />,
    icon_2: <Moderate />,
    color: "#5AA6FF",
  },
  {
    status: "delete",
    label: "Удалено",
    icon_2: <Delete />,
    icon: <ExclamationCircleOutlined />,
    color: "#FF1E1E",
  },
  {
    status: "reject",
    label: "Не прошло",
    icon: <MinusCircleOutlined />,
    icon_2: <Reject />,
    color: "#FA7311",
  },
  {
    status: "wait",
    label: "В очереди",
    icon: <ClockCircleOutlined />,
    icon_2: <Wait />,
    color: "#FFD600",
  },
];

export const StatusComponent = ({
  status,
  withOutBorder,
}: {
  status: string;
  withOutBorder?: boolean;
}) => {
  const setStatus = statusMap.find((item) => item.status === status);

  if (withOutBorder) {
    return (
      <div style={{ display: "flex", gridGap: "5px" }}>
        <div>{setStatus?.icon_2}</div>
        <b style={{ marginTop: "1px" }}>{setStatus?.label}</b>
      </div>
    );
  }

  return (
    <div>
      <Tag
        icon={setStatus?.icon}
        color={setStatus?.color}
        style={{ width: 120 }}
      >
        {setStatus?.label}
      </Tag>
    </div>
  );
};
