import { Title } from "../../../common/Typography";
import { Details, DetailsContainer } from "./styles";
import { Skeleton } from "antd";

type Props = {
  delete?: number;
  moderate?: number;
  reject?: number;
  success?: number;
  isLoading: boolean;
};

export const DetailsCardHostStatistics = (props: Props) => {
  const { isLoading, success, reject, moderate, delete: deleteP } = props;
  return (
    <DetailsContainer>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Опубликовано
        </Title>
        <Title level={2} style={{ color: "#1BBD3F" }}>
          {isLoading ? <Skeleton.Input active size={"small"} /> : success}
        </Title>
      </Details>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          На модерации
        </Title>
        <Title level={2} style={{ color: "#5AA6FF" }}>
          {isLoading ? <Skeleton.Input active size={"small"} /> : moderate}
        </Title>
      </Details>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Не прошло
        </Title>
        <Title level={2} style={{ color: "#FA7211" }}>
          {isLoading ? <Skeleton.Input active size={"small"} /> : reject}
        </Title>
      </Details>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Удалено
        </Title>
        <Title level={2} style={{ color: "#FF1E1E" }}>
          {isLoading ? <Skeleton.Input active size={"small"} /> : deleteP}
        </Title>
      </Details>
    </DetailsContainer>
  );
};
