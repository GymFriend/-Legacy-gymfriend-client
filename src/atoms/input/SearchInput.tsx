import React, { ChangeEventHandler, ReactElement } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  placeholder?: string | undefined;
  onChange: ChangeEventHandler;
}

const SearchInput = ({ placeholder, onChange }: Props): ReactElement => {
  return (
    <div className="search-input">
      <FaSearch className="search-input__svg" />
      <input placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default SearchInput;
