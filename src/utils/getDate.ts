import { newsMonth } from "../constants";

var options = {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
  timezone: "UTC",
} as const;

var optionsWithTime = {
  ...options,
  hour: "numeric",
  minute: "numeric",
} as const;

export const getRangeDate = ({
  start = 0,
  end = 0,
}: {
  start?: number;
  end?: number;
}) => {
  return `${new Date(start * 1000).toLocaleString("ru", options)}-${new Date(
    end * 1000
  ).toLocaleString("ru", options)}`;
};

export const getDate = ({ date = 0 }: { date?: number }) => {
  return `${new Date(date * 1000).toLocaleString("ru", options)}`;
};

export const getDateWithTime = ({ date = 0 }: { date?: number }) => {
  return `${new Date(date * 1000).toLocaleString("ru", optionsWithTime)}`;
};

export const toUnixDate = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};

export const getNewsDate = ({ date = 0 }: { date?: number }) => {
  return {
    month: newsMonth[new Date(date * 1000).getMonth()],
    day: new Date(date * 1000).getDate(),
  };
};
