import { useEffect } from "react";
import { useMail } from "../../hooks/useEmail";
import { MailItem } from "./MailItem";

export const ListOfMails = () => {
  const { listOfMail, handleGet } = useMail();

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <>
      {listOfMail?.map((item, index) => (
        <MailItem mail={item} key={index} />
      ))}
    </>
  );
};
