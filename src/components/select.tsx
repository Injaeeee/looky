import { Select as ChakraSelect } from "@chakra-ui/react";
import styled from "styled-components";
import { Season, TPO } from "../types/article.types";
import { Gender, Height, Mood } from "../types/user.types";

interface SelectGroupProps {
  onSelectChange: (
    key: "season" | "tpo" | "mood" | "gender" | "height",
  ) => (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectGroup({ onSelectChange }: SelectGroupProps) {
  return (
    <SelectContainer>
      <StyledChakraSelect
        onChange={onSelectChange("season")}
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        placeholder="계절"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(Season).map((Season) => (
          <option key={Season} value={Season}>
            {Season}
          </option>
        ))}
      </StyledChakraSelect>
      <StyledChakraSelect
        onChange={onSelectChange("tpo")}
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        placeholder="TPO"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(TPO).map((TPO) => (
          <option key={TPO} value={TPO}>
            {TPO}
          </option>
        ))}
      </StyledChakraSelect>
      <StyledChakraSelect
        onChange={onSelectChange("mood")}
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        placeholder="Mood"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(Mood).map((Mood) => (
          <option key={Mood} value={Mood}>
            {Mood}
          </option>
        ))}
      </StyledChakraSelect>
      <StyledChakraSelect
        onChange={onSelectChange("gender")}
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        placeholder="성별"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(Gender).map((Gender) => (
          <option key={Gender} value={Gender}>
            {Gender}
          </option>
        ))}
      </StyledChakraSelect>
      <StyledChakraSelect
        onChange={onSelectChange("height")}
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        placeholder="키"
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
