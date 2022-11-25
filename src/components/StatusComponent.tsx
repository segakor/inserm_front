import React from "react";
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
  { status: 'Опубликовано', icon: <CheckCircleOutlined />, color: '#1BBD3F' },
  { status: 'На модерации', icon: <PauseCircleOutlined />, color: '#5AA6FF' },
  { status: 'Удалено', icon: <ExclamationCircleOutlined />, color: '#FF1E1E' },
  { status: 'Не прошло', icon: <MinusCircleOutlined />, color: '#FA7311' },
  { status: 'В очереди', icon: <ClockCircleOutlined />, color: '#FFD600' },
]


export const StatusComponent = ({ status }: { status: string }) => {

  const setStatus = statusMap.find(item => item.status === status)

  return (
    <div>
      <Tag icon={setStatus?.icon} color={setStatus?.color}>
        {status}
      </Tag>
    </div>
  );
};
