type Props = {
  email: string;
  projectName: string;
  formId: string;
  price: number;
  period?: number;
};
export const goToAinoxPage = ({
  email,
  projectName,
  formId,
  price,
  period,
}: Props) => {
  window.location.replace(
    `https://go.ainox.pro/antispam/?email=${email}&nazvanie-proekta=${projectName}&idform=${formId}&cena=${price}&period=${period}&&idhits=22659`
  );
};

export const goToAinoxPagePiece = ({
  email,
  projectName,
  formId,
  price,
}: Props) => {
  window.location.replace(
    `https://go.ainox.pro/antispam/?email=${email}&nazvanie=${projectName}&idform=${formId}&cena=${price}&&idhits=22659`
  );
};