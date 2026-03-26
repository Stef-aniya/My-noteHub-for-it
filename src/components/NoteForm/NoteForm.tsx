import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./TaskForm.module.css";

import { createTask } from "../../services/noteService";

interface TaskFormProps {
  onSuccess: () => void;
}

export default function TaskForm({ onSuccess }: TaskFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
