import { Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { RemoveRequestStatus } from "../../types";
import { statusRemovedReviews } from "../../constants";

type Props = {
  onClick: () => void;
  removeRequestStatus: RemoveRequestStatus;
};

export const ButtonCreateRemoveRequest = ({
  onClick,
  removeRequestStatus,
}: Props) => {
  const location = useLocation();

  if (location.pathname.split("/").includes("demo")) return null;

  return (
    <>
      <Tag
        style={{
          cursor: removeRequestStatus === "not" ? "pointer" : " not-allowed",
        }}
        icon={<ExclamationCircleOutlined />}
        color="error"
        onClick={() => removeRequestStatus === "not" && onClick()}
      >
        {statusRemovedReviews.find((item=>item.status === removeRequestStatus))?.label}
      </Tag>
    </>
  );
};
