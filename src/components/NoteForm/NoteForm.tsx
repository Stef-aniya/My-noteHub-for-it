import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./TaskForm.module.css";

import { createNote } from "../../services/noteService";

interface NoteFormProps {
  onSuccess: () => void;
}

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const text = formData.get("text") as string;

    if (text.trim() !== "") {
      mutate({ text });
    }
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.label}>
        Task text
        <textarea name="text" className={css.input} rows={5} />
      </label>

      <button type="submit" className={css.button} disabled={isPending}>
        Create
      </button>
    </form>
  );
}
