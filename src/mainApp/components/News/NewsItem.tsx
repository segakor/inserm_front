import { DeleteFilled } from "@ant-design/icons";
import { Title } from "../../../common/Typography";
import { getNewsDate } from "../../../utils";
import { TimeBlock, Wrapper, WrapperDesc } from "./styles";
import { News } from "../../../types";

type Props = {
  news: News;
  isAdmin: boolean;
  onDelete: (id: number) => void;
};

export const NewsItem = ({ isAdmin, news, onDelete }: Props) => {
  const { day, month } = getNewsDate({ date: news.createDate });
  return (
    <Wrapper>
      <TimeBlock>
        <Title level={2} style={{ borderBottom: "2px solid black" }}>
          {day}
        </Title>
        <Title level={5} style={{ fontWeight: "500" }}>
          {month}
        </Title>
      </TimeBlock>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <WrapperDesc>
          <Title level={3} style={{ marginBottom: "8px" }}>
            {news.title}
          </Title>
          <Title level={5} style={{ whiteSpace: "pre-line", fontWeight: 400 }}>
            {news.description}
          </Title>
        </WrapperDesc>
        {isAdmin && (
          <div>
            <DeleteFilled
              onClick={() => onDelete && onDelete(news.id)}
              style={{ color: "red", cursor: "pointer", float: "right" }}
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};
