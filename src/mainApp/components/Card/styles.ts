import styled from "styled-components";

export const Panel = styled.div<{
  isCompleted: boolean;
  isReadyToWork?: boolean;
}>`
  background: ${(props) =>
    props.isCompleted
      ? "#8BFFB3"
      : props?.isReadyToWork
      ? "#f7e4dc"
      : "#ffffff"};
  border-radius: 10px;
  min-height: 80px;
  padding: 12px 20px 12px 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
  :hover {
    background-color: whitesmoke;
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StatusRow = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Divider = styled.div`
  margin-right: 8px;
  margin-left: 8px;
`;

export const DetailsContainer = styled.div<{ isFinance?: boolean }>`
  width: 100%;
  /* Задаем грид */
  display: grid;
  /*   Задаем ширины колонок:
  auto-fit - сам выберет количество колонок, смотря сколько поместится
  minmax - задаем минимальное и максимальное значение
  150px - меньше 150 колонка не займет в ширину
  1fr - при ширине больше минимальной колонка будет растягиваться */
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  /*   Расстояние между колонками */
  gap: 10px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    ${(props) =>
      props.isFinance &&
      `display: flex;
      flex-direction: column;`}
  }
`;
export const Details = styled.div`
  min-height: 100px;
  background: #ffffff;
  border-radius: 10px;
  padding: 12px 12px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
