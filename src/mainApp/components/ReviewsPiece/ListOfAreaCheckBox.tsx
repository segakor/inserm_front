import { Divider } from "antd";
import { AreaCheckBox } from "./AreaCheckBox";
import { ListOfAreaCheckBoxWrapper, StyledTitle } from "./styles";
import {areas} from '../../../constants';


type Props = {
  handleClickArea: (e: any) => void;
  selectedArea: string[];
};

export const ListOfAreaCheckBox = (props: Props) => {
  return (
    <>
      <StyledTitle level={5}>
        2. Выберите нужные площадки для размещения отзывов (наша компания
        работает только с данными площадками)
      </StyledTitle>
      <ListOfAreaCheckBoxWrapper>
        {areas.map((item, index) => (
          <AreaCheckBox key={index} areaName={item} {...props} />
        ))}
      </ListOfAreaCheckBoxWrapper>
      <Divider />
    </>
  );
};
