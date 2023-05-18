import styled from "styled-components";
import { Title } from "../../../common/Typography";
import { Button, Input } from "antd";
import { ReactComponent as Delete } from "../../../assets/delete.svg";

export const Wrapper = styled.div`
  max-width: 1030px;
`;

export const StyledTitle = styled(Title)`
  margin-bottom: 16px !important;
  font-weight: 700 !important;
  font-size: 18px !important;
`;

export const AreaWrapper = styled.div`
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  padding: 5px 5px 5px 20px;
  height: 38px;
  align-items: center;
  justify-content: space-between;
`;
export const AreaName = styled.div`
  margin-right: 50px;
`;

export const CheckBox = styled.div`
  border-radius: 10px;
  background: #daedff;
  display: flex;
  align-items: center;
  width: 50px;
  height: 28px;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding-top: 3px;
  cursor: pointer;
`;

export const ListOfAreaCheckBoxWrapper = styled.div`
  display: flex;
  grid-gap: 10px;
  width: auto;
  flex-wrap: wrap;
`;

export const AreaItemInputWrapper = styled.div`
  display: flex;
  grid-gap: 10px;
`;

export const AreaItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AreaItemName = styled(Title)`
  margin-bottom: 10px !important;
  font-weight: 500 !important;
`;

export const AddItemButton = styled(Button)`
  color: white;
  background-color: #313131;
  :hover {
    color: white !important;
  }
  float: right;
`;
export const DeleteIcon = styled(Delete)`
  cursor: pointer;
  margin-top: 5px;
`;

export const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
`;

export const StyledInput = styled(Input)`
  border-radius: 10px;
`;

export const PriceBox = styled.div`
  width: 220px;
  height: 186px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
`;

export const PriceCard = styled.div<{ color: string }>`
  width: 180px;
  height: 100px;
  background: ${(props) => props.color};
  border-radius: 10px;
  padding: 12px 20px 12px 20px;
  color: white;
  grid-gap: 19px;
  display: flex;
  flex-direction: column;
`;

export const PriceWrapper = styled.div`
  display: flex;
  grid-gap: 20px;
  width: auto;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

export const FooterWrapper = styled.div`
  display: flex;
  /* width: 100%; */
  flex-wrap: wrap;
  /* max-width: 1030px; */
  justify-content: space-between;
  /* justify-content: flex-start; */
  @media (max-width: 768px) {
    grid-gap: 10px;
  }
`;
export const FooterCardAmount = styled.div`
  height: 50px;
  border-radius: 10px;
  padding: 8px 20px 20px 20px;
  background: #1579e9;
  min-width: 180px;
  color: white;
  @media (max-width: 768px) {
    width: auto;
  }
`;
export const FooterCardPrice = styled(FooterCardAmount)`
  background-color: #313131;
`;
export const FooterCardTime = styled(FooterCardAmount)`
  background-color: transparent;
  border: 2px solid #313131;
`;
export const FooterCardTotalPrice = styled(FooterCardAmount)`
  background-color: transparent;
  border: 2px solid #1579e9;
`;
export const FooterButton = styled(Button)`
  background: #1579e9;
  border-radius: 10px;
  height: 50px;
  min-width: 180px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
