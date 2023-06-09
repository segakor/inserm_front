import { copyBrief } from "../../request";
import { ReqCopyBrief } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useCopyBrief = () => {
  const handleCopyBrief = async (value: ReqCopyBrief) => {
    return new Promise((resolve, reject) => {
      copyBrief(value)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          openNotificationWithIcon({
            type: "error",
            message: "",
            description: `Не удалось скопировать бриф`,
          });
          reject();
        });
    });
  };

  return {
    handleCopyBrief,
  };
};
