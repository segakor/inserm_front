import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { CreateCampaignPlatform } from "../../components/CreateCampaign";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Payment = () => {
  return (
    <Page>
      <Header>Оформление заказа</Header>
      <CreateCampaignPlatform />
    </Page>
  );
};

export default Payment;
