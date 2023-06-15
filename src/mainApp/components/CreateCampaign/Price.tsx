import { Title } from "../../../common/Typography";
import { PriceCard, PriceBox, PriceWrapper } from "./styles";
import { colorCardCampaign } from "../../../constants";
import { CampaignTariff } from "../../../types";
import { Spin } from "antd";

const PriceItem = (props: CampaignTariff) => {
  const currentPrice = colorCardCampaign.find((item) => item.id === props.id);
  const color = currentPrice?.color;
  const title = currentPrice?.title;
  return (
    <PriceBox>
      <Title level={4} style={{ fontWeight: 800 }}>
        {title}
      </Title>
      <PriceCard color={color || ""}>
        <div>стоимость за штуку</div>
        <Title level={2} style={{ color: "white", fontWeight: 700 }}>
          {props.price} руб.
        </Title>
      </PriceCard>
    </PriceBox>
  );
};

export const Price = ({
  tariff,
  isLoadingTariff,
}: {
  tariff: CampaignTariff[];
  isLoadingTariff: boolean;
}) => {
  if (isLoadingTariff) {
    return <Spin />;
  }
  return (
    <PriceWrapper>
      {tariff?.map((item, index) => (
        <PriceItem key={index} {...item} />
      ))}
    </PriceWrapper>
  );
};
