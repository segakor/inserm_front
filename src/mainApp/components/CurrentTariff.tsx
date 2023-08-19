import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Select } from "antd";
import "./AntSelectCustomStyle.css";
import { TariffItem } from "./TariffItem";
import { Title } from "../../common/Typography";
import { Campaign, Project } from "../../types";
import { ModalСonfirmation } from "./ModalСonfirmation";
import { useUnsubscribe } from "../hooks/useUnsubscribe";
import { confirmationText } from "../../constants";
import { TariffItemCampaign } from "./TariffItemCampaign";

const Wrapper = styled.div`
  display: flex;
  grid-gap: 20px;
  margin: 20px 0 30px 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const CurrentTariffSection = styled.div`
  width: 460px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: auto;
    display: flex;
    flex-direction: column;
  }
`;

type Props = {
  clientProject: Project[] | undefined;
  clientCampaign: Campaign[] | undefined;
};

export const CurrentTariff = ({ clientProject, clientCampaign }: Props) => {
  const [selectValue, setSelectValue] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoPay, setIsAutoPay] = useState(false);

  const handleChange = (value: string) => {
    setSelectValue(value);
  };

  const allProject = [clientProject, clientCampaign].flat();

  const listOfProject = allProject?.map((item) => ({
    label: item?.name,
    value: JSON.stringify({
      id: item?.id,
      type: item?.type,
      label: item?.name,
    }),
  }));

  useEffect(() => {
    if (!!listOfProject.length) {
      setSelectValue(listOfProject[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProjectData = useCallback(() => {
    const dataSelect = JSON.parse(selectValue || "{}");

    const target = allProject.filter(
      (item) => item?.id === dataSelect.id && item?.type === dataSelect.type
    );

    return {
      type: dataSelect.type,
      id: target[0]?.id || 0,
      //@ts-ignore
      tariff: dataSelect.type === "project" ? target[0]?.tariff : null,
      autopay: target[0]?.autopay,
    };
  }, [selectValue]);

  const { type, id, tariff, autopay } = getProjectData();

  const handleChangeAutoPay = () => {
    handleOpen();
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsAutoPay(autopay || false);
  }, [autopay]);

  const { handleUnsubscribe } = useUnsubscribe();

  const onUnsubcribe = () => {
    handleUnsubscribe(id, type)
      .then(() => {
        setIsAutoPay(false);
        handleClose();
      })
      .catch(() => handleClose());
  };

  return (
    <>
      {!!listOfProject?.length ? (
        <>
          <Title level={5} style={{ fontWeight: "400" }}>
            Выберите проект
          </Title>
          <Wrapper>
            <Select
              onChange={handleChange}
              options={listOfProject}
              value={JSON.parse(selectValue || "{}")?.label}
            />
          </Wrapper>
          {tariff && (
            <>
              <CurrentTariffSection>
                <TariffItem
                  {...getProjectData().tariff}
                  onChangeAutoPay={handleChangeAutoPay}
                  autoPay={isAutoPay}
                />
              </CurrentTariffSection>
            </>
          )}
          {!tariff && (
            <CurrentTariffSection>
              <TariffItemCampaign
                autoPay={isAutoPay}
                onChangeAutoPay={handleChangeAutoPay}
              />
            </CurrentTariffSection>
          )}
        </>
      ) : (
        <Wrapper>
          <Title level={5}>Нет ни одного проекта, создайте его</Title>
        </Wrapper>
      )}
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
