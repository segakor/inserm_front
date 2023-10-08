import styled from "styled-components";
import { Title } from "../../../common/Typography";
import { Button } from "antd";

const StyledTitle = styled(Title)`
  margin-bottom: 30px !important;
`;

const Wrapper = styled.div`
  width: 80%;
  @media (max-width: 768px) {
    width: auto;
  }
`;

export const ExportMoney = () => {
  return (
    <Wrapper>
      <StyledTitle level={5} style={{ fontWeight: "400" }}>
        Чтобы вывести денежные средства, нажмите на кнопку{" "}
        <b>Вывод денежных средств</b>. В открывшимся окне можно будет выбрать
        способ вывода средств и указать сумму вывода.
      </StyledTitle>
      <Button type="primary" size="large">
        Вывод денежных средств
      </Button>
    </Wrapper>
  );
};
