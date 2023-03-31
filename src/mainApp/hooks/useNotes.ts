import { useState } from "react";
import { createNote, getNotes } from "../../request";
import { Note } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>();

  const handleCreateNote = async (value: {
    projectId: string;
    text: string;
  }) => {
    try {
      await createNote(value);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось отправить сообщение",
      });
    }
  };

  const handleGetNotes = async (projectId: string) => {
    try {
      const response = await getNotes(projectId);
      setNotes(response.data.result);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить заметки",
      });
    }
  };


  return {
    handleCreateNote,
    handleGetNotes,
    notes
  };
};
