import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./TaskList.module.css";

import { deleteNote, updateNote } from "../../services/noteService";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteTaskM = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateTaskM = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <ul className={css.list}>
      {notes
        .toSorted((a, b) => {
          if (a.completed === b.completed) return 0;
          return a.completed ? 1 : -1;
        })
        .map((task) => (
          <li key={task.id} className={css.item}>
            <input
              type="checkbox"
              defaultChecked={task.completed}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateTaskM.mutate([
                  task.id,
                  { ...task, completed: event.target.checked },
                ])
              }
            />
            <span className={css.text}>{task.text}</span>
            <button
              type="button"
              className={css.button}
              disabled={deleteTaskM.isPending}
              onClick={() => deleteTaskM.mutate(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
}
