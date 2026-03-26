import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onSearch: (value: string) => void;
}

function SearchBox({ search, onSearch }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search"
      className={css.searchInput}
      defaultValue={search}
      onChange={handleChange}
    />
  );
}

export default SearchBox;
