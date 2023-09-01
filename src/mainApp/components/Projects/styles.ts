import styled from "styled-components";

export const CardBlock = styled.div<{ color?: string }>`
  width: 600px;
  border-radius: 10px;
  background: ${(props) => props.color};
  padding: 20px 20px 20px 20px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
  @media (max-width: 768px) {
    width: auto;
    margin: 0 0 40px 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
  }
`;

export const TariffBlock = styled.div<{ mt: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.mt && "34px"};
  @media (max-width: 768px) {
    margin: 0;
  }
`;
export const TariffCard = styled.div`
  width: 267px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px 15px 20px 15px;
`;
export const TitleDate = styled.div`
  padding: 5px 10px 5px 10px;
  background: #1579e9;
  border-radius: 5px;
  color: #ffffff;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const FooterLink = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StatusTransfer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 600px;
  margin-bottom: 10px;
  align-items: center;
  grid-gap: 8px;
  @media (max-width: 768px) {
    width: auto;
  }
`;
