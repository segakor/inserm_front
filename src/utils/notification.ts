import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

type Props = {
  type: NotificationType;
  message: string;
  description: string;
};

export const openNotificationWithIcon = ({
  type,
  message,
  description,
}: Props) => {
  notification[type]({
    duration: 3,
    placement: "bottom",
    message: message,
    description: description,
  });
};
