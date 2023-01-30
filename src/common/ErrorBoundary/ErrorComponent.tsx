import React from "react";
import { Button, Result } from "antd";

type Props = {
  errMessage: string;
};

export const ErrorComponent = ({ errMessage }: Props) => {
  const gotoMain = () =>{
    localStorage.removeItem("loginData");
    //@ts-ignore
    window.location.reload(false);
  }
  return (
    <Result
      status="500"
      title="500"
      subTitle={`Извините, что-то пошло не так ${errMessage}`}
      extra={
        <Button type="primary" onClick={gotoMain}>
          На главную
        </Button>
      }
    />
  );
};
