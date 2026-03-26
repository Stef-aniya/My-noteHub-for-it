import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "./components/SearchBox/SearchBox";
import NoteList from "./components/NoteList/NoteList";
import Modal from "./components/Modal/Modal";
import NoteForm from "./components/NoteForm/NoteForm";
import { getNotes } from "./services/noteService";
import css from "./App.module.css";
import useModalControl from "./hooks/useModalControl";
import { keepPreviousData } from "@tanstack/react-query";
import Pagination from "./components/Pagination/Pagination";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { isModalOpen, openModal, closeModal } = useModalControl();

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 1000);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => getNotes(search, page),
    keepPreviousData: true,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onSearch={handleSearch} />
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <strong className={css.loading}>Loading tasks...</strong>}
      {data?.length > 0 && !isLoading && <NoteList notes={data} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} />
        </Modal>
      )}
      {data?.totalPages > 1 &&(
        <Pagination
          pages={data.totalPages}
          perPage={12}
          onPageChange={(page) => setPage(page)}
        />,
      )}
    </div>
  );
}
