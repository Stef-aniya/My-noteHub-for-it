import axios from "axios";

import type { Note, CreateNote, UpdateNote } from "../types/note";

axios.defaults.headers.common["Authorization"] =
  `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface FetchNotesResponse {
  data: Note[];
  totalPages: number;
}

export const getNotes = async (
  search: string,
  page: number,
  perPage = 12,
): Promise<FetchNotesResponse> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  const response = await axios.get(
    "https://notehub-public.goit.study/api/notes",
    {
      params: { search, page, perPage },
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
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
