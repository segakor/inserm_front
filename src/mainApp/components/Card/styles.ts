import styled from "styled-components";

export const Panel = styled.div<{ isCompleted: boolean }>`
  background: ${(props) => (props.isCompleted ? "#8BFFB3" : "#ffffff")};
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