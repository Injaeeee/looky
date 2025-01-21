import { Search2Icon } from "@chakra-ui/icons";
import styled from "styled-components";
import React, { forwardRef, useState } from "react";

interface CustomInputProps {
  placeholder: string;
  type?: string;
  ref?: React.Ref<HTMLInputElement>;
}

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputWrapper>
      <SearchCustomInput
        placeholder="게시물명을 입력해주세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchButton onClick={handleSearch}>
        <Search2Icon color="pink.100" />
      </SearchButton>
    </InputWrapper>
  );
};
const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ placeholder, ...props }, ref) => {
    return <CustomInput placeholder={placeholder} {...props} ref={ref} />;
  },
);

const InputWrapper = styled.div`
  position: relative;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 1%;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
`;

const SearchCustomInput = styled.input`
  padding: 8px 20px 8px;
  border: 1px solid var(--gray800);
  width: 100%;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  background: transparent;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--pink100);
    outline: none;
  }
`;

const CustomInput = styled.input`
  padding: 12px 17px;
  border: 1px solid var(--gray800);
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  background: transparent;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--pink100);
    outline: none;
  }
`;

export { SearchInput, Input };
