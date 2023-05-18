import { ReactComponent as CheckAreaIcon } from "../../../assets/checkArea.svg";
import { AreaName, AreaWrapper, CheckBox } from "./styles";

type Props = {
  areaName: {
    label: string;
    value: string;
  };
  handleClickArea: (e: any) => void;
  selectedArea: string[];
};
export const AreaCheckBox = ({
  areaName,
  selectedArea,
  handleClickArea,
}: Props) => {
  const handleClick = () => {
    handleClickArea(areaName.value);
  };
  return (
    <AreaWrapper>
      <AreaName>{areaName.label}</AreaName>
      <CheckBox onClick={handleClick}>
        <div>
          {selectedArea.find((item) => item === areaName.value) ? (
            <CheckAreaIcon />
          ) : (
            <></>
          )}
        </div>
      </CheckBox>
    </AreaWrapper>
  );
};
