import { Search2Icon } from "@chakra-ui/icons";
import {
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

export default function Input() {
  return (
    <InputGroup>
      <ChakraInput
        placeholder="상품명을 입력해주세요"
        focusBorderColor="pink.100"
      />
      <InputRightElement>
        <Search2Icon color="pink.100" />
      </InputRightElement>
    </InputGroup>
  );
}
