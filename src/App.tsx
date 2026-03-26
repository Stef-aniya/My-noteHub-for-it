import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "./components/SearchBox/SearchBox";
import TaskList from "./components/NoteList/NoteList";
import Modal from "./components/Modal/Modal";
import TaskForm from "./components/NoteForm/NoteForm";
import { getTasks } from "./services/noteService";
import css from "./App.module.css";

import useModalControl from "./hooks/useModalControl";

export default function App() {
  const [search, setSearch] = useState("");

  const { isModalOpen, openModal, closeModal } = useModalControl();

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 1000);

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", search],
    queryFn: () => getTasks(search),
  });

  return (
    <div className={css.container}>
      <header className={css.header}>
        <SearchBox search={search} onSearch={handleSearch} />
        <button className={css.createButton} onClick={openModal}>
          Create task
        </button>
      </header>
      {isLoading && <strong className={css.loading}>Loading tasks...</strong>}
      {data && !isLoading && <TaskList tasks={data} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <TaskForm onSuccess={closeModal} />
        </Modal>
      )}
    </div>
  );
}
