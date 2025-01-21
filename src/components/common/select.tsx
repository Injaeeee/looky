import React, { forwardRef } from "react";
import { Select as ChakraSelect } from "@chakra-ui/react";
import { Season, TPO } from "../../types/article.types";
import { Gender, Height, Mood } from "../../types/user.types";
import styled from "styled-components";

interface SelectProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MoodSelect = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return (
    <ChakraSelect
      ref={ref}
      {...props}
      width="auto"
      borderColor="white"
      focusBorderColor="pink.100"
      size="lg"
      placeholder="Mood"
      _hover={{ borderColor: "pink.200" }}
    >
      {Object.values(Mood).map((mood) => (
        <option key={mood} value={mood}>
          {mood}
        </option>
      ))}
    </ChakraSelect>
  );
});

MoodSelect.displayName = "MoodSelect";

const GenderSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    return (
      <ChakraSelect
        ref={ref}
        {...props}
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        placeholder="성별"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(Gender).map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </ChakraSelect>
    );
  },
);

GenderSelect.displayName = "GenderSelect";

const HeightSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    return (
      <ChakraSelect
        ref={ref}
        {...props}
        width="auto"
        borderColor="white"
        focusBorderColor="pink.100"
        size="lg"
        placeholder="키"
        _hover={{ borderColor: "pink.200" }}
      >
        {Object.values(Height).map((height) => (
          <option key={height} value={height}>
            {height}
          </option>
        ))}
      </ChakraSelect>
    );
  },
);

HeightSelect.displayName = "HeightSelect";

const SelectGroup = ({
  onSelectChange,
}: {
  onSelectChange: (
    key: "season" | "tpo" | "mood" | "gender" | "height",
  ) => (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
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
        {Object.values(Season).map((season) => (
          <option key={season} value={season}>
            {season}
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
        {Object.values(TPO).map((tpo) => (
          <option key={tpo} value={tpo}>
            {tpo}
          </option>
        ))}
      </StyledChakraSelect>

      <MoodSelect onChange={onSelectChange("mood")} />
      <GenderSelect onChange={onSelectChange("gender")} />
      <HeightSelect onChange={onSelectChange("height")} />
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  display: flex;
  gap: 5px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
`;

const StyledChakraSelect = styled(ChakraSelect)`
  option {
    color: black;
  }
`;

export { SelectGroup, MoodSelect, GenderSelect, HeightSelect };
