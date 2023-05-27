import { Title } from "../../common/Typography";
import { areas } from "../../constants";
import { CampaignCard } from "../../types";

type Props = {
  cards: CampaignCard[];
};

const getPlatforms = (cards: CampaignCard[]) => {
  const allPlatform = cards?.map((item) => item.type);
  return [...new Set(allPlatform)];
};

export const CampaignArea= ({ cards }: Props) => {
  const platforms = getPlatforms(cards);

  return (
    <>
      {platforms.map((val, index) => (
        <Title level={5} style={{ fontSize: "18px" }} key={index}>
          {areas.find((item) => item.value === val)?.label}
        </Title>
      ))}
    </>
  );
};
