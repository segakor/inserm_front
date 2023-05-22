import { ReactComponent as CheckAreaIcon } from "../../../assets/checkArea.svg";
import { AreaName, AreaWrapper, CheckBox } from "./styles";

type Props = {
  areaName: {
    label: string;
    value: string;
  };
  selectedArea: string[];
  isLoading: boolean;
  handleClickArea: (e: any) => void;
};
export const AreaCheckBox = ({
  areaName,
  selectedArea,
  isLoading,
  handleClickArea,
}: Props) => {
  const handleClick = () => {
    !isLoading ? handleClickArea(areaName.value):''
  };
  return (
    <AreaWrapper isDisabled={isLoading}  onClick={handleClick}>
      <AreaName>{areaName.label}</AreaName>
      <CheckBox>
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
