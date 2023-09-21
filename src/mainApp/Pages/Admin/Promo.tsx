import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { TablePromo } from "../../Table/TablePromo";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Promo = () => {
  return (
    <Page>
      <Header>Промокоды</Header>
      <TablePromo />
    </Page>
  );
};

export default Promo;
