import { Select as ChakraSelect } from "@chakra-ui/react";
import styled from "styled-components";

export default function SelectGroup() {
  const selectOptions = [
    { placeholder: "성별", options: ["남성", "여성"] },
    { placeholder: "계절", options: ["봄", "여름", "가을", "겨울"] },
    { placeholder: "TPO", options: ["캐주얼", "정장", "운동", "파티"] },
    { placeholder: "MOOD", options: ["활발", "차분", "우아", "발랄"] },
    {
      placeholder: "신장",
      options: ["150cm 이하", "150-160cm", "160-170cm", "170cm 이상"],
    },
  ];

  return (
    <SelectContainer>
      {selectOptions.map((select, index) => (
        <StyledChakraSelect
          width="auto"
          key={index}
          placeholder={select.placeholder}
          borderColor="white"
          focusBorderColor="pink.100"
          size="lg"
          _hover={{ borderColor: "pink.200" }}
        >
          {select.options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </StyledChakraSelect>
      ))}
    </SelectContainer>
  );
}

const SelectContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const StyledChakraSelect = styled(ChakraSelect)`
  option {
    color: black;
  }
`;
