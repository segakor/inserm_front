import styled from "styled-components";
import { Title, Header } from "../../common/Typography";
import { FormChangeClientInfoDemo } from "../Form/FormChangeClientInfoDemo";
import { FormChangePasswordDemo } from "../Form/FormChangePasswordDemo";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 860px;
  margin-top: 20px;
  grid-gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
  }
`;

export const ProfileDemo = () => {

  return (
    <Page>
      <Header>Профиль</Header>
      <Title level={4} style={{ fontWeight: "700" }}>
        Иван Иванов
      </Title>
      <Title level={5} style={{ fontWeight: "400" }}>
        demo@test.ru
      </Title>
      <FlexBox>
        <FormChangeClientInfoDemo />
        <FormChangePasswordDemo />
      </FlexBox>
    </Page>
  );
};
