import { FormInstance } from "antd";
import { AreaItem } from "./AreaItem";
import { StyledTitle } from "./styles";

type Props = {
  selectedArea: string[];
  priceForOne: number;
  form: FormInstance;
};
export const ListOfAreaItem = ({ selectedArea, priceForOne, form }: Props) => {
  return (
    <>
      <StyledTitle level={5}>
        3. Укажите ссылки на карточки вашей компании и количество отзывов для
        каждой карточки
      </StyledTitle>
      {selectedArea.map((item, index) => (
        <AreaItem areaValue={item} key={index} priceForOne={priceForOne} form={form} />
      ))}
    </>
  );
};
