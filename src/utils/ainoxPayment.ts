type AinoxProject = {
  email: string;
  projectName: string;
  price: number;
  period: number;
  tariffId: number;
};
type AinoxCampaign = Omit<AinoxProject, "tariffId" | "period">;

export const goToAinoxPageProject = ({
  email,
  projectName,
  price,
  period,
  tariffId,
}: AinoxProject) => {
  const formId = JSON.parse(import.meta.env.VITE_AINOX_CONNECTOR_PROJECT);
  console.log(import.meta.env.VITE_AINOX_CONNECTOR_PROJECT)
  const targetFormId = Array.isArray(formId) ? formId[tariffId - 1] : formId;
  window.location.replace(
    `https://go.ainox.pro/antispam/?email=${email}&nazvanie-proekta=${projectName}&idform=${targetFormId}&cena=${price}&period=${period}&&idhits=22659`
  );
};

export const goToAinoxPageCampaign = ({
  email,
  projectName,
  price,
}: AinoxCampaign) => {
  const formId = import.meta.env.VITE_AINOX_CONNECTOR_CAMPAIGN;
   window.location.replace(
    `https://go.ainox.pro/antispam/?email=${email}&nazvanie=${projectName}&idform=${formId}&cena=${price}&&idhits=22659`
  );
};