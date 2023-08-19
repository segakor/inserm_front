type AinoxProject = {
  email: string;
  projectName: string;
  price: number;
  period: number;
  tariffId: number;
};
type AinoxCampaign = Omit<AinoxProject, "tariffId" | "period"> & {
  isRecurent: boolean;
};

export const goToAinoxPageProject = ({
  email,
  projectName,
  price,
  period,
  tariffId,
}: AinoxProject) => {
  const formId = JSON.parse(import.meta.env.VITE_AINOX_CONNECTOR_PROJECT);
  const targetFormId = Array.isArray(formId) ? formId[tariffId - 1] : formId;
  window.location.replace(
    `https://go.ainox.pro/antispam/?email=${email}&nazvanie-proekta=${projectName}&idform=${targetFormId}&cena=${price}&period=${period}&&idhits=22659`
  );
};

export const goToAinoxPageCampaign = ({
  email,
  projectName,
  price,
  isRecurent,
}: AinoxCampaign) => {
  const formId = isRecurent
    ? import.meta.env.VITE_AINOX_CONNECTOR_CAMPAIGN_RECURENT
    : import.meta.env.VITE_AINOX_CONNECTOR_CAMPAIGN;
  window.location.replace(
    `https://go.ainox.pro/antispam/?email=${email}&nazvanie=${projectName}&idform=${formId}&cena=${price}&&idhits=22659`
  );
};
