import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

type Props = {
  type: NotificationType;
  message: string;
  description?: string;
  status?: number;
};

export const openNotificationWithIcon = ({
  type,
  message,
  description,
  status,
}: Props) => {
  if (status !== 401)
    notification[type]({
      duration: 3,
      placement: "bottom",
      message: message,
      description: description,
    });
};
