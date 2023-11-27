import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 80px;
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;
const TimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
`;
const WrapperDesc = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 86px;
  @media (max-width: 768px) {
    h3 {
      font-size: 18px !important;
    }
  }
`;

export { WrapperDesc, Wrapper, TimeBlock };
