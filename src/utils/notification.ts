import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

type NotificationType = "success" | "info" | "warning" | "error";

type Props = {
  type: NotificationType;
  message: string;
  description?: string;
  status?: number;
  placement?: NotificationPlacement;
};

export const openNotificationWithIcon = ({
  type,
  message,
  description,
  status,
  placement = "bottom",
}: Props) => {
  if (status !== 401)
    notification[type]({
      duration: 3,
      placement: placement,
      message: type === 'error' && 'Ошибка',
      description: description,
    });
};
