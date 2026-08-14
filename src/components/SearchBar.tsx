import type { ChangeEvent, FC } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className="search-input"
      type="search"
      value={value}
      onChange={handleChange}
      placeholder="Search by handle or name"
      aria-label="Search the directory"
    />
  );
};
