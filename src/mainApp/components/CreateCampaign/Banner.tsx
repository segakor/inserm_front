import { bannerText } from "../../../constants";
import { BannerWrapper } from "./styles";

export const Banner = () => {
  return (
    <BannerWrapper>
      <ul>
        {bannerText.map((item, index) => (
          <li key={index}>
            <div dangerouslySetInnerHTML={{ __html: `${item}` }}></div>
          </li>
        ))}
      </ul>
    </BannerWrapper>
  );
};
