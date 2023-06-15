import { FormInstance } from "antd";
import { AreaItem } from "./AreaItem";

type Props = {
  selectedArea: string[];
  priceForOne: number;
  form: FormInstance;
};
export const ListOfAreaItem = ({ selectedArea, priceForOne, form }: Props) => {
  return (
    <>
      {selectedArea.map((item, index) => (
        <AreaItem areaValue={item} key={index} priceForOne={priceForOne} form={form} />
      ))}
    </>
  );
};
