import { useState } from "react";
import { getMails, getMailDetails, updateMail, sendEmail } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { Mail, MailDetail, ReqMailUpdate } from "../../types";

export const useMail = () => {
  const [listOfMail, setListOfMail] = useState<Mail[] | null>(null);
  const [details, setDetails] = useState<MailDetail | null>(null);
  const [loading, setLoading] = useState({
    body: false,
    list: false,
    send: false,
  });

  const handleGet = async () => {
    try {
      setLoading({ ...loading, list: true });
      const res = await getMails();
      setListOfMail(res.data.result);
    } catch (err) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить шаблоны писем",
      });
    } finally {
      setLoading({ ...loading, list: false });
    }
  };

  const handleGetDetails = async (id: number) => {
    try {
      setLoading({ ...loading, body: true });
      const res = await getMailDetails(id);
      setDetails(res.data.result);
    } catch (err) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить детали письма",
      });
    } finally {
      setLoading({ ...loading, body: false });
    }
  };

  const handleUpdate = async (val: ReqMailUpdate) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await updateMail(val);
          await handleGetDetails(val.id);
          openNotificationWithIcon({
            type: "success",
            message: "",
            description: "Шаблон письма успешно обновлен",
          });
          resolve(true);
        } catch (error) {
          reject();
          openNotificationWithIcon({
            type: "error",
            message: "",
            description: "Не удалось обновить шаблон письма",
          });
        }
      })();
    });
  };

  const handleSend = async (id: number) => {
    try {
      setLoading({ ...loading, send: true });
      await sendEmail(id);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Отправлено",
      });
    } catch (err) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось отправить письмо",
      });
    } finally {
      setLoading({ ...loading, send: false });
    }
  };

  return {
    handleGet,
    handleGetDetails,
    handleUpdate,
    handleSend,
    listOfMail,
    details,
    loading,
  };
};
