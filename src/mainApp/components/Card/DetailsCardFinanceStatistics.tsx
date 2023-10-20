import { Title } from "../../../common/Typography";
import { Skeleton } from "antd";
import { Details, DetailsContainer } from "./styles";

type Props = {
  revenue?: number;
  totalPrice?: number;
  isLoading: boolean;
};

export const DetailsCardFinanceStatistics = ({
  revenue,
  totalPrice,
  isLoading,
}: Props) => {
  return (
    <DetailsContainer isFinance>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Поступления
        </Title>
        <Title level={2} style={{ color: "#8567FF" }}>
          {isLoading ? (
            <Skeleton.Input active size={"small"} />
          ) : (
            <>{totalPrice?.toLocaleString()} ₽</>
          )}
        </Title>
      </Details>
      <Details>
        <Title
          style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "500" }}
        >
          Прибыль
        </Title>
        <Title level={2} style={{ color: "#1BBD3F" }}>
          {isLoading ? (
            <Skeleton.Input active size={"small"} />
          ) : (
            <>{revenue?.toLocaleString()} ₽</>
          )}
        </Title>
      </Details>
    </DetailsContainer>
  );
};
