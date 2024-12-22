import styled from "styled-components";
import { Tag as ChakraTag, TagLabel, TagCloseButton } from "@chakra-ui/react";

interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <StyledTag variant="outline" colorScheme="pink">
      <TagLabel>{label}</TagLabel>
    </StyledTag>
  );
}

const StyledTag = styled(ChakraTag)`
  display: inline-block;
  padding: 0 8px;
  white-space: nowrap;
  border-radius: 4px;
  height: 20px;
  max-width: fit-content;
`;
