import React, { useEffect, useState } from "react";
import { Button, Divider, Input, Steps } from "antd";
import styled from "styled-components";
import { Header } from "../../Typography";
import { TariffSelectionBlock } from "../../TariffSelectionBlock";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../../context/hooks";
import { setProjectForPayment } from "../../../context/action";
import { usePerson } from "../../../hooks/usePerson";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  display: flex;
`;

export const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [current, setCurrent] = useState(0);

  usePerson();

  const navigation = useNavigate();

  const dispatch = useDispatch();

  const onSelectedTariff = (e: any) => {
    dispatch(
      setProjectForPayment({
        projectName: projectName,
        period: e.period,
        tariffId: e.id,
        price: e.price,
      })
    );
    navigation("/client/applypayment");
  };

  const steps = [
    {
      title: "Введите название проекта",
      content: (
        <Input
          placeholder="Название проекта"
          style={{ width: "300px", height: "40px" }}
          onChange={(e) => setProjectName(e.target.value)}
        />
      ),
    },
    {
      title: "Выберете период и тариф",
      content: <TariffSelectionBlock onSelectTarif={onSelectedTariff} />,
    },
    {
      title: "Оплата",
      content: "",
    },
  ];

  const next = () => {
    setCurrent((prev) => prev + 1);
  };

  const prev = () => {
    setCurrent((prev) => prev - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://code.jquery.com/jquery-2.2.4.min.js";

    document.body.appendChild(script);
  }, []);

  return (
    <Page>
      <Header>Создание проекта</Header>
      <Steps current={current} items={items} />
      <Divider />
      <div className="steps-content">{steps[current].content}</div>
      <Divider />
      <ButtonWrapper>
        {current === 0 && (
          <Button
            type="primary"
            onClick={() => next()}
            disabled={!projectName ? true : false}
            style={{ width: "100px" }}
          >
            Далее
          </Button>
        )}
        {current > 0 && (
          <Button style={{ width: "100px" }} onClick={() => prev()}>
            Назад
          </Button>
        )}
      </ButtonWrapper>
    </Page>
  );
};
