import { useEffect, useState } from "react";
import {
  getCampaignPaymentDetails,
  getCampaignTransferDetails,
} from "../../request";
import { FormInstance } from "antd";

type Props = {
  id: string;
  form: FormInstance;
  setArea: (e: string[]) => void;
  isCashless?: boolean;
};
export const useGetCampaignDetails = ({
  id,
  form,
  setArea,
  isCashless,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGet = async () => {
    try {
      setIsLoading(true);
      const response = await getCampaignPaymentDetails(id);

      const { projectName, groppedByType } = response.data.result;
      form.setFieldValue("projectName", projectName);
      groppedByType.forEach((item) =>
        form.setFieldValue(item.type, item.cards)
      );
      setArea(groppedByType.map((item) => item.type));

      if (isCashless) {
        const response = await getCampaignTransferDetails(id);

        for (const [key, value] of Object.entries(response.data)) {
          form.setFieldValue(key, value);
        }
      }
      
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
  };
};
