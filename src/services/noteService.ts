import axios from "axios";

import type { Note, CreateNote, UpdateNote } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/docs";

export const getNotes = async (search: string): Promise<Note[]> => {
  const res = await axios.get<Note[]>("/notes", {
    params: {
      search,
    },
  });
  return res.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (taskId: Note["id"]): Promise<void> => {
  await axios.delete(`/notes/${taskId}`);
};

export const updateNote = async ([taskId, payload]: [
  Note["id"],
  UpdateNote,
]): Promise<Note> => {
  const { data } = await axios.put<Note>(`/notes/${taskId}`, payload);
  return data;
};
