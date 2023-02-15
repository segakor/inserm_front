type Props = {
  email: string;
  projectName: string;
  formIdsValue: string;
  price: number;
  period: number;
};
export const goToAinoxPage = ({
  email,
  projectName,
  formIdsValue,
  price,
  period,
}: Props) => {
  window.location.replace(
    `https://go.ainox.pro/antispam/?email=${email}&nazvanie-proekta=${projectName}&idform=${formIdsValue}&cena=${price}&period=${period}&&idhits=22659`
  );
};
