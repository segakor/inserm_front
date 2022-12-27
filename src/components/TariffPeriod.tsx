import { useState } from "react";
import styled from "styled-components";
import { Title } from "./Typography";

const Box = styled.button<{ isPressed: boolean; disabled: boolean }>`
  width: 220px;
  height: 40px;
  border-radius: 5px;
  background: #ffffff;
  padding: 5px 5px 5px 15px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border: none;
  cursor: ${(props) => (!props.disabled ? "pointer" : "")};
  border: ${(props) => (props.isPressed ? "1px solid #1579e9" : "")};
  background: ${(props) => (props.isPressed ? "transparent" : "")};
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

type Props = {
  onClickPeriod: (keyId: number) => void;
};

export const TariffPeriod = ({ onClickPeriod }: Props) => {
  const [keyId, setKeyId] = useState(1);

  const setIsPressed = (key: number) => (keyId === key ? true : false);

  const handleClick = (keyId: number) => {
    setKeyId(keyId);
    onClickPeriod(keyId);
  };

  return (
    <Wrapper>
      <Box
        onClick={() => handleClick(1)}
        isPressed={setIsPressed(1)}
        disabled={setIsPressed(1)}
      >
        <Title level={5} style={{ fontWeight: "400" }}>
          1 месяц
        </Title>
      </Box>
      <Box
        onClick={() => handleClick(3)}
        isPressed={setIsPressed(3)}
        disabled={setIsPressed(3)}
      >
        <Title level={5} style={{ fontWeight: "400" }}>
          3 месяца
        </Title>
        <Discount>
          <Title
            style={{ fontWeight: "800", fontSize: "14px", color: "#FFFFFF" }}
          >
            -5%
          </Title>
        </Discount>
      </Box>
      <Box
        onClick={() => handleClick(6)}
        isPressed={setIsPressed(6)}
        disabled={setIsPressed(6)}
      >
        <Title level={5} style={{ fontWeight: "400" }}>
          6 месяцев
        </Title>
        <Discount>
          <Title
            style={{ fontWeight: "800", fontSize: "14px", color: "#FFFFFF" }}
          >
            -8%
          </Title>
        </Discount>
      </Box>
      <Box
        onClick={() => handleClick(12)}
        isPressed={setIsPressed(12)}
        disabled={setIsPressed(12)}
      >
        <Title level={5} style={{ fontWeight: "400" }}>
          12 месяцев
        </Title>
        <Discount>
          <Title
            style={{ fontWeight: "800", fontSize: "14px", color: "#FFFFFF" }}
          >
            -10%
          </Title>
        </Discount>
      </Box>
    </Wrapper>
  );
};
