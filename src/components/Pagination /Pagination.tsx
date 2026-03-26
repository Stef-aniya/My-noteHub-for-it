import ReactPaginate from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from "./Pagination.module.css";

interface PaginationProps {
  pages: number;
  perPage: number;
  onPageChange: (nextPage: number) => void;
}

export default function Pagination({
  pages,
  perPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pages}
      pageRangeDisplayed={8}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={perPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
