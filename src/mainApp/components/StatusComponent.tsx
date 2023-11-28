import { Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";

//тут лучше айди в status
const statusMap = [
  {
    status: "success",
    label: "Опубликовано",
    icon: <CheckCircleOutlined />,
    color: "#1BBD3F",
  },
  {
    status: "moderate",
    label: "На модерации",
    icon: <PauseCircleOutlined />,
    color: "#5AA6FF",
  },
  {
    status: "delete",
    label: "Удалено",
    icon: <ExclamationCircleOutlined />,
    color: "#FF1E1E",
  },
  {
    status: "reject",
    label: "Не прошло",
    icon: <MinusCircleOutlined />,
    color: "#FA7311",
  },
  {
    status: "wait",
    label: "В очереди",
    icon: <ClockCircleOutlined />,
    color: "#FFD600",
  },
];

export const StatusComponent = ({ status }: { status: string }) => {
  const setStatus = statusMap.find((item) => item.status === status);

  return (
    <div>
      <Tag icon={setStatus?.icon} color={setStatus?.color} style={{ width: 120 }}>
        {setStatus?.label}
      </Tag>
    </div>
  );
};
