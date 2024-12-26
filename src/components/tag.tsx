import styled from "styled-components";
import { Tag as ChakraTag, TagLabel, TagCloseButton } from "@chakra-ui/react";

interface TagProps {
  label: string;
}

export function PinkTag({ label }: TagProps) {
  return (
    <ChakraTag
      sx={{
        border: "1px solid",
        borderColor: "var(--pink100)",
        background: "transparent",
        color: "var(--pink100)",
        borderRadius: "2px",
        height: "20px",
      }}
    >
      <TagLabel>{label}</TagLabel>
    </ChakraTag>
  );
}

export function PinkBlurTag({ label }: TagProps) {
  return (
    <ChakraTag
      sx={{
        border: "1px solid",
        borderColor: "var(--pink100)",
        background: "var(--pink10)",
        borderRadius: "2px",
        height: "30px",
        padding: "8px",
      }}
    >
      <PinkLabel>{label}</PinkLabel>
    </ChakraTag>
  );
}
export function BlurTag({ label }: TagProps) {
  return (
    <ChakraTag
      sx={{
        border: "1px solid",
        borderColor: "var(--gray500)",
        background: "var(--gray10)",
        borderRadius: "2px",
        padding: "8px",
      }}
    >
      <LabelWrapper>
        <GrayLabel>{label}</GrayLabel>
        <GrayLabel>asddas</GrayLabel>
        <PinkLabel>asas</PinkLabel>
      </LabelWrapper>
    </ChakraTag>
  );
}

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PinkLabel = styled(TagLabel)`
  color: var(--pink100);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
`;

const GrayLabel = styled(TagLabel)`
  color: var(--gray400);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
`;
