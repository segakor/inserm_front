import { Button, Result } from "antd";
import { useEffect } from "react";

type Props = {
  errMessage: string;
};

export const ErrorComponent = ({ errMessage }: Props) => {
  const gotoMain = () => {
    localStorage.removeItem("loginData");
    //@ts-ignore
    window.location.reload(false);
  };

  useEffect(() => {
    const chunkFailedMessage = /dynamically imported/;
    if (errMessage && chunkFailedMessage.test(errMessage)) {
      //@ts-ignore
      window.location.reload(false);
    }
  }, [errMessage]);

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
