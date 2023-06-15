import { Divider } from "antd";
import { AreaCheckBox } from "./AreaCheckBox";
import { ListOfAreaCheckBoxWrapper } from "./styles";
import { areas } from "../../../constants";

type Props = {
  handleClickArea: (e: any) => void;
  selectedArea: string[];
  isLoading: boolean;
};

export const ListOfAreaCheckBox = (props: Props) => {
  return (
    <>
      <ListOfAreaCheckBoxWrapper>
        {areas.map((item, index) => (
          <AreaCheckBox key={index} areaName={item} {...props} />
        ))}
      </ListOfAreaCheckBoxWrapper>
      <Divider />
    </>
  );
};
