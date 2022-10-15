import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
const { Title: TitleAnt } = Typography;

export const Title = styled(TitleAnt)`
  margin: 0 !important;
`;

//Header
type Props = {
  children: string;
};
const StyledHeader = styled(Title)`
  font-size: 30px !important;
  font-weight: 800 !important;
  line-height: 130% !important;
  margin-bottom: 40px !important;
  @media (max-width: 768px) {
    font-size: 20px !important;
    margin-bottom: 30px !important;
  }
`;

export const Header = ({ children }: Props) => {
  return <StyledHeader>{children}</StyledHeader>;
};
