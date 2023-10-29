import { useState } from "react";
import { createNote, deleteNote, getNotes } from "../../request";
import { Note } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>();

  const handleCreateNote = async (
    value: {
      id: string;
      text: string;
    },
    type: string
  ) => {
    try {
      await createNote(value, type);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось отправить сообщение",
      });
    }
  };

  const handleGetNotes = async (id: string, type: string) => {
    try {
      const response = await getNotes(id, type);
      setNotes(response.data.result);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить заметки",
      });
    }
  };

  const handleDeleteNote = async (
    noteId: number,
    type: string,
    projectId: string
  ) => {
    try {
      await deleteNote(noteId, type);
      await handleGetNotes(projectId, type);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось удалить заметку",
      });
    }
  };

  return {
    handleCreateNote,
    handleGetNotes,
    notes,
    handleDeleteNote
  };
};
