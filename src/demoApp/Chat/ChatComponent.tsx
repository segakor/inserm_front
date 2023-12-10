import { Chat } from "./Chat";

type Props = {
  chatType: "client" | "support";
  roomId: number | null;
  isMobile: boolean;
};

export const ChatComponent = ({ ...props }: Props) => {
  return <Chat {...props} />;
};
