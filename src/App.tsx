import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "./components/SearchBox/SearchBox";
import NoteList from "./components/NoteList/NoteList";
import Modal from "./components/Modal/Modal";
import NoteForm from "./components/NoteForm/NoteForm";
import Pagination from "./components/Pagination/Pagination";

import { getNotes } from "./services/noteService";
import useModalControl from "./hooks/useModalControl";
import css from "./App.module.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { isModalOpen, openModal, closeModal } = useModalControl();

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => getNotes(search, page),
  });

  const notes = data?.data || [];
  const totalPages = data?.totalPages || 0;

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onSearch={handleSearch} />
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <strong className={css.loading}>Loading notes...</strong>}
      {error && <strong className={css.error}>Error loading notes</strong>}

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} />
        </Modal>
      )}

      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
