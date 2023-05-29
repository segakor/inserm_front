import styled from "styled-components";
import { Title, Header } from "../../../common/Typography";
import { FormChangePassword } from "../../Form/FormChangePassword";
import { FormChangeClientInfo } from "../../Form/FormChangeClientInfo";
import { usePerson } from "../../hooks/usePerson";
import { useLocalState } from "../../context/hooks";

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

const Profile = () => {
  usePerson();
  const state = useLocalState();
  const { personInfo } = state;

  return (
    <Page>
      <Header>Профиль</Header>
      <Title level={4} style={{ fontWeight: "700" }}>
        {personInfo?.first_name} {personInfo?.last_name}
      </Title>
      <Title level={5} style={{ fontWeight: "400" }}>
        {personInfo?.email}
      </Title>
      <FlexBox>
        <FormChangeClientInfo />
        <FormChangePassword />
      </FlexBox>
    </Page>
  );
};

export default Profile;