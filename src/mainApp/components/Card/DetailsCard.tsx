import styled from "styled-components";
import { Statuses } from "../../../types";
import { Title } from "../../../common/Typography";

const DetailsContainer = styled.div<{ withBorder?: boolean }>`
  width: 100%;
  /* Задаем грид */
  display: grid;
  /*   Задаем ширины колонок:
  auto-fit - сам выберет количество колонок, смотря сколько поместится
  minmax - задаем минимальное и максимальное значение
  150px - меньше 150 колонка не займет в ширину
  1fr - при ширине больше минимальной колонка будет растягиваться */
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); //было 150
  /*   Расстояние между колонками */
  gap: 10px;
  margin-bottom:  ${(props) => (props.withBorder ? "0px" : "30px")};;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); //было 150
  }
`;
const Details = styled.div<{ withBorder?: boolean }>`
  min-height: 100px;
  background: #ffffff;
  border-radius: 10px;
  padding: 12px 12px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid #f0f0f0;
  border: ${(props) => (props.withBorder ? "2px solid #F0F0F0" : "none")};
`;

type Props = {
  statuses?: Statuses;
  withBorder?: boolean;
};

export const DetailsCard = ({ statuses, withBorder }: Props) => {
  return (
    <DetailsContainer withBorder={withBorder}>
      <Details withBorder={withBorder}>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Всего
        </Title>
        <Title level={2}>{statuses?.all || 0}</Title>
      </Details>
      <Details withBorder={withBorder}>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Опубликовано
        </Title>
        <Title level={2} style={{ color: "#1BBD3F" }}>
          {statuses?.success || 0}
        </Title>
      </Details>
      <Details withBorder={withBorder}>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Осталось
        </Title>
        <Title level={2} style={{ color: "#8567FF" }}>
          {statuses?.left || 0}
        </Title>
      </Details>
      <Details withBorder={withBorder}>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          На модерации
        </Title>
        <Title level={2} style={{ color: "#5AA6FF" }}>
          {statuses?.moderate || 0}
        </Title>
      </Details>
      <Details withBorder={withBorder}>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Не прошло
        </Title>
        <Title level={2} style={{ color: "#FA7211" }}>
          {statuses?.reject || 0}
        </Title>
      </Details>
      <Details withBorder={withBorder}>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Удалено
        </Title>
        <Title level={2} style={{ color: "#FF1E1E" }}>
          {statuses?.delete || 0}
        </Title>
      </Details>
    </DetailsContainer>
  );
};
