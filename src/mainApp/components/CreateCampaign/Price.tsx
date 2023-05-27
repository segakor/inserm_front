import { Title } from "../../../common/Typography";
import { PriceCard, PriceBox, PriceWrapper } from "./styles";
import { piecePrice } from "../../../constants";
import { PiecePrice } from "../../../types";

const PriceItem = (props: PiecePrice) => {
  return (
    <PriceBox>
      <Title level={4} style={{ fontWeight: 800 }}>
        {props.title}
      </Title>
      <PriceCard color={props.color}>
        <div>стоимость за штуку</div>
        <Title level={2} style={{color:'white', fontWeight:700}}>{props.price} руб.</Title>
      </PriceCard>
    </PriceBox>
  );
};

export const Price = () => {
  return (
    <PriceWrapper>
      {piecePrice.map((item, index) => (
        <PriceItem key={index} {...item} />
      ))}
    </PriceWrapper>
  );
};
