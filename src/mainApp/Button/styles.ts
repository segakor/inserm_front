import { Button } from "antd";
import styled from "styled-components";

export const OutlinedButton = styled(Button)`
  border-radius: 10px;
  min-width: 180px;
  height: 50px;
  background: transparent;
  margin-bottom: 20px;
  border: 2px solid #1579e9;
  color: #1579e9;
`;

export const FilledSmallButton = styled(Button)`
  border-radius: 10px;
  width: 180px;
  height: 34px;
  background-color: #1579e9;
  margin-bottom: 20px;
  border: 2px solid #1579e9;
  color: #ffffff;
  :hover {
    color: #ffffff !important;
  }
`;

export const ButtonChangeRowWrapper = styled.div`
  display: flex;
  grid-gap: 8px;
`;
