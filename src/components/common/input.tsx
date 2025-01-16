import { Search2Icon } from "@chakra-ui/icons";
import styled from "styled-components";

interface CustomInputProps {
  placeholder: string;
}

export function SearchInput() {
  return (
    <InputWrapper>
      <SearchCustomInput placeholder="상품명을 입력해주세요" />
      <SearchButton>
        <Search2Icon color="pink.100" />
      </SearchButton>
    </InputWrapper>
  );
}

export default function Input({ placeholder, ...props }: CustomInputProps) {
  return <CustomInput placeholder={placeholder} {...props} />;
}

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
  padding: 8px 12px;
  border: 1px solid var(--gray800);
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
