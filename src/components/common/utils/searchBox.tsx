import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";

interface SearchBoxProps {
  onSearch: (title: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    onSearch(input);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Form className="search-box">
      <FormControl
        type="search"
        placeholder="Buscar"
        aria-label="Buscar"
        style={{ fontSize: "20px" }}
        value={searchInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Form>
  );
};
