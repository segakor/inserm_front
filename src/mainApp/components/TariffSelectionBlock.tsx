import React from "react";
import styled from "styled-components";
import "./AntSelectCustomStyle.css";
import { TariffItem } from "./TariffItem";
import { TariffIndividual } from "./TariffIndividual";
/* import { TariffPeriod } from "./TariffPeriod"; */
import { useGetTariff } from "../hooks/useGetTariff";

const SectionItem = styled.div`
  display: grid;
  grid-template-columns: 460px 460px;
  grid-row: auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

type Props = {
  onSelectTarif?: (e: any) => void
}

export const TariffSelectionBlock = (props: Props) => {
  /* const [tariffPeriod, setTariffPeriod] = useState(1); */

  const tariffPeriod = 1

  const { tariffs } = useGetTariff();

  /* const handleChangePeriod = (key: number) => {
    setTariffPeriod(key);
  }; */

  const selectedTariffs = tariffs?.tariffs[tariffPeriod];

  //TODO:периоды доделать по готовсности

  return (
    <>
      {/* <TariffPeriod onClickPeriod={handleChangePeriod} /> */}
      <SectionItem>
        {selectedTariffs?.map((item, index) => (
          <TariffItem {...item} key={index} period={tariffPeriod} {...props} />
        ))}
        <TariffIndividual />
      </SectionItem>
    </>
  );
};
