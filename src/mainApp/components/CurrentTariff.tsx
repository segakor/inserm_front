import { useEffect, useState } from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { useUnsubscribe } from "../hooks/useUnsubscribe";
import { confirmationText } from "../../constants";
import { TariffItemCampaign } from "./TariffItemCampaign";
import { ModalСonfirmation } from "./Modal";
import { useGetClientTariff } from "../hooks/useGetClientTariff";
import { Spin } from "antd";

const TariffWrapper = styled.div`
  width: 460px;
  @media (max-width: 768px) {
    width: auto;
    display: flex;
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  display: flex;
  grid-gap: 40px;
  width: auto;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CurrentTariff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectData, setProjectData] = useState<{
    id: number;
    type: string;
  } | null>(null);

  const handleChangeAutoPay = ({ id, type }: { id: number; type: string }) => {
    setProjectData({ id, type });
    handleOpen();
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setProjectData(null);
  };

  const { handleUnsubscribe } = useUnsubscribe();

  const { data, handleGetClientTariff, isLoading } = useGetClientTariff();

  useEffect(() => {
    handleGetClientTariff();
  }, []);

  const onUnsubcribe = () => {
    handleUnsubscribe(projectData?.id || 0, projectData?.type || "")
      .then(() => {
        handleClose();
        handleGetClientTariff();
      })
      .catch(() => handleClose());
  };

  if (isLoading) {
    return <Spin />;
  }

  if (!data && !isLoading) {
    return <Title level={5}>У вас нет ни одного проекта, создайте его</Title>;
  }

  return (
    <>
      <Wrapper>
        {data?.campaigns?.map((item, index) => (
          <TariffWrapper key={index}>
            <TariffItemCampaign
              autoPay={item.autopay}
              onChangeAutoPay={handleChangeAutoPay}
              name={item.name}
              period={item.period}
              id={item.campaignId}
              price={item.price}
              count={item.count}
            />
          </TariffWrapper>
        ))}
        {data?.projects?.map((item, index) => (
          <TariffWrapper key={index}>
            <TariffItemCampaign
              autoPay={item.autopay}
              onChangeAutoPay={handleChangeAutoPay}
              name={item.name}
              id={item.projectId}
              price={item.price}
              count={item.count}
              start={item.start}
              end={item.end}
            />
          </TariffWrapper>
        ))}
      </Wrapper>
      {isModalOpen && (
        <ModalСonfirmation
          onClose={handleClose}
          onConfirm={onUnsubcribe}
          confirmationText={confirmationText.autoPay}
        />
      )}
    </>
  );
};
