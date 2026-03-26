import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../../types/task";
import css from "./TaskList.module.css";

import { deleteTask, updateTask } from "../../services/noteService";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const queryClient = useQueryClient();

  const deleteTaskM = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateTaskM = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <ul className={css.list}>
      {tasks
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
