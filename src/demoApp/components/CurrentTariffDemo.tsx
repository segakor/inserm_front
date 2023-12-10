import styled from "styled-components";
import { TariffItemCampaign } from "../../mainApp/components/TariffItemCampaign";
import { demoCampaign, demoProject } from "../constants";


const TariffWrapper = styled.div`
  width: 460px;
  @media (max-width: 768px) {
    width: auto;
    display: flex;
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  display: flex;
  grid-gap: 40px;
  width: auto;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CurrentTariffDemo = () => {
  
  return (
    <>
      <Wrapper>
        {demoCampaign?.map((item, index) => (
          <TariffWrapper key={index}>
            <TariffItemCampaign
              autoPay={item.autopay}
              onChangeAutoPay={()=>console.log()}
              name={item.name}
              period={item.period}
              id={1}
              price={250}
              count={item.statuses.all}
            />
          </TariffWrapper>
        ))}
        {demoProject?.map((item, index) => (
          <TariffWrapper key={index}>
            <TariffItemCampaign
              autoPay={item.autopay}
              onChangeAutoPay={()=>console.log()}
              name={item.name}
              id={1}
              price={item.tariff.price}
              count={item.tariff.amount}
              start={item.tariff.start}
              end={item.tariff.end}
            />
          </TariffWrapper>
        ))}
      </Wrapper>
    </>
  );
};
