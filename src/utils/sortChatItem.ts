import { Notify, Room } from "../types";

export const sortChatItem = (room: Room[], notify: Notify[]) => {
  if (!!notify.length) {
    room.map((roomItem) => {
      notify.forEach((element) => {
        if (element.roomId === roomItem.id) {
          roomItem.unread = element.unread;
        }
      });
      return roomItem;
    });
  }

  return room.sort((a, b) => b.unread - a.unread);
};
