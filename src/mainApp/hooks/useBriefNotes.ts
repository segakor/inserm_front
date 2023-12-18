import { useState } from "react";
import { createBriefNote, getBriefNotes } from "../../request";
import { BriefNote, ReqCreateBriefNote } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useBriefNotes = () => {
  const [notes, setNotes] = useState<BriefNote[]>();

  const handleCreateNote = async (value: ReqCreateBriefNote) => {
    try {
      await createBriefNote(value);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось добавить заметку",
      });
    }
  };

  const handleGetNotes = async (id: number) => {
    try {
      const response = await getBriefNotes(id);
      setNotes(response.data.result);
    } catch {}
  };

  return {
    handleCreateNote,
    handleGetNotes,
    notes,
  };
};
