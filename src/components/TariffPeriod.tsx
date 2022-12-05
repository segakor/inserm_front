import styled from "styled-components";
import { Title } from "./Typography";

const Box = styled.button`
  width: 220px;
  height: 40px;
  border-radius: 5px;
  background: #ffffff;
  padding: 5px 5px 5px 15px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
 /*  :hover{
    border:1px solid #1579e9;
    background: transparent;
  } */
  :focus{
    border:1px solid #1579e9;
    background: transparent;
  }
`;
const Wrapper = styled.div`
  display: flex;
  grid-gap: 20px;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
const Discount = styled.div`
  width: 50px;
  height: 30px;
  background: #1579e9;
  border-radius: 5px;
  padding: 5px 5px 5px 10px;
`;

export const TariffPeriod = () => {
  return (
    <Wrapper>
      <Box>
        <Title level={5} style={{ fontWeight: "400" }}>
          1 месяц
        </Title>
      </Box>
      <Box>
        <Title level={5} style={{ fontWeight: "400" }}>
          3 месяца
        </Title>
        <Discount>
          <Title style={{ fontWeight: "800", fontSize: '14px', color: '#FFFFFF' }}>
            -5%
          </Title>
        </Discount>
      </Box>
      <Box>
        <Title level={5} style={{ fontWeight: "400" }}>
          6 месяцев
        </Title>
        <Discount>
          <Title style={{ fontWeight: "800", fontSize: '14px', color: '#FFFFFF' }}>
            -8%
          </Title>
        </Discount>
      </Box>
      <Box>
        <Title level={5} style={{ fontWeight: "400" }}>
          12 месяцев
        </Title>
        <Discount>
          <Title style={{ fontWeight: "800", fontSize: '14px', color: '#FFFFFF' }}>
            -10%
          </Title>
        </Discount>
      </Box>
    </Wrapper>
  );
};
