import { Form } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 20px;
`;
const TitleMail = styled.div`
  display: flex;
  justify-content: space-between;
  .input {
    border-left: 3px dashed black;
    width: 30%;
  }
`;
const Body = styled.div`
  margin-top: 16px;
  border-left: 3px dashed black;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-gap: 8px;
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;
    margin-left: 10px;
  }
`;

export { Wrapper, TitleMail, Body, Buttons, StyledForm };
