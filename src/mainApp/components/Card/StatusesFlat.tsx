import { Status, StatusRow, Divider } from "./styles";
import { Title } from "../../../common/Typography";
import { Statuses } from "../../../types";

type Props = {
  statuses: Statuses | undefined;
};

export const StatusesFlat = ({ statuses }: Props) => {
  return (
    <>
      <Status>
        <>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            Опубликовано
          </Title>
          <Divider>-</Divider>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#1BBD3F",
            }}
          >
            {statuses?.success || 0}
          </Title>
          <Divider>|</Divider>
        </>
        <>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            Осталось
          </Title>
          <Divider>-</Divider>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#8567FF",
            }}
          >
            {statuses?.left || 0}
          </Title>
          <Divider>|</Divider>
        </>
        <>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            На модерации
          </Title>
          <Divider>-</Divider>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#5AA6FF",
            }}
          >
            {statuses?.moderate || 0}
          </Title>
          <Divider>|</Divider>
        </>
        <>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            Не прошло
          </Title>
          <Divider>-</Divider>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#FA7211",
            }}
          >
            {statuses?.reject || 0}
          </Title>
          <Divider>|</Divider>
        </>
        <>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            Удалено
          </Title>
          <Divider>-</Divider>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#FF1E1E",
            }}
          >
            {statuses?.delete || 0}
          </Title>
          <Divider>|</Divider>
        </>
        <>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            Всего
          </Title>
          <Divider>-</Divider>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>
            {statuses?.all || 0}
          </Title>
        </>
      </Status>
      <StatusRow>
        <div>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            Опубликовано
          </Title>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#1BBD3F",
            }}
          >
            {statuses?.success || 0}
          </Title>
        </div>
        <div>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            Осталось
          </Title>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#8567FF",
            }}
          >
            {statuses?.left || 0}
          </Title>
        </div>
        <div>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            На модерации
          </Title>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#5AA6FF",
            }}
          >
            {statuses?.moderate || 0}
          </Title>
        </div>
        <div>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            Не прошло
          </Title>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#FA7211",
            }}
          >
            {statuses?.reject || 0}
          </Title>
        </div>
        <div>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            Удалено
          </Title>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#FF1E1E",
            }}
          >
            {statuses?.delete || 0}
          </Title>
        </div>
        <div>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#8E8E8E",
            }}
          >
            Всего
          </Title>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>
            {statuses?.all || 0}
          </Title>
        </div>
      </StatusRow>
    </>
  );
};
