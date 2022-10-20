import React from "react";
import styled from "styled-components";
import { Title } from "./Typography";

const DetailsContainer = styled.div`
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
  margin-bottom: 30px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); //было 150
  }
`;
const Details = styled.div`
  min-height: 100px;
  background: #ffffff;
  border-radius: 10px;
  padding: 12px 12px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const DetailsProject = () => {
  return (
    <DetailsContainer>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Всего
        </Title>
        <Title level={2}>15</Title>
      </Details>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Опубликовано
        </Title>
        <Title level={2} style={{ color: "#1BBD3F" }}>
          15
        </Title>
      </Details>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Осталось
        </Title>
        <Title level={2} style={{ color: "#8567FF" }}>
          15
        </Title>
      </Details>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          На модерации
        </Title>
        <Title level={2} style={{ color: "#5AA6FF" }}>
          15
        </Title>
      </Details>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Не прошло
        </Title>
        <Title level={2} style={{ color: "#FA7211" }}>
          15
        </Title>
      </Details>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Удалено
        </Title>
        <Title level={2} style={{ color: "#FF1E1E" }}>
          15
        </Title>
      </Details>
    </DetailsContainer>
  );
};
