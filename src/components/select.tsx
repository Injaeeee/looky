import { Select as ChakraSelect } from "@chakra-ui/react";
import styled from "styled-components";
import { Season, TPO } from "../types/article.types";
import { Gender, Height, Mood } from "../types/user.types";

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
      <StyledChakraSelect
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(Season).map((Season) => (
          <option key={Season} value={Season}>
            {Season}
          </option>
        ))}
      </StyledChakraSelect>
      <StyledChakraSelect
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(TPO).map((TPO) => (
          <option key={TPO} value={TPO}>
            {TPO}
          </option>
        ))}
      </StyledChakraSelect>
      <StyledChakraSelect
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(Mood).map((Mood) => (
          <option key={Mood} value={Mood}>
            {Mood}
          </option>
        ))}
      </StyledChakraSelect>
      <StyledChakraSelect
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(Gender).map((Gender) => (
          <option key={Gender} value={Gender}>
            {Gender}
          </option>
        ))}
      </StyledChakraSelect>
      <StyledChakraSelect
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(Height).map((Height) => (
          <option key={Height} value={Height}>
            {Height}
          </option>
        ))}
      </StyledChakraSelect>
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
