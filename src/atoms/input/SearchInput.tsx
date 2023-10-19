import React, { ChangeEventHandler, ReactElement } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  placeholder?: string | undefined;
  onChange: ChangeEventHandler;
  prefix?: ReactElement | null;
}

const SearchInput = ({ placeholder, onChange, prefix }: Props): ReactElement => {
  return (
    <div className="search-input">
      <FaSearch />
      <input placeholder={placeholder} onChange={onChange} />
      {prefix}
    </div>
  );
};

export default SearchInput;
