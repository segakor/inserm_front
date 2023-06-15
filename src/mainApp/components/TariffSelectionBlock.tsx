import styled from "styled-components";
import "./AntSelectCustomStyle.css";
import { TariffItem } from "./TariffItem";
import { TariffIndividual } from "./TariffIndividual";
import { useGetTariff } from "../hooks/useGetTariff";
import { Spin } from "antd";

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
  onSelectTarif?: (tariff: {
    period: number;
    price: number;
    id: number;
  }) => void;
};

export const TariffSelectionBlock = (props: Props) => {
  const tariffPeriod = 1;

  const { tariffs, isLoading } = useGetTariff();

  const selectedTariffs = tariffs?.tariffs[tariffPeriod];

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <SectionItem>
        {selectedTariffs?.map((item, index) => (
          <TariffItem {...item} key={index} period={tariffPeriod} {...props} />
        ))}
        <TariffIndividual />
      </SectionItem>
    </>
  );
};
