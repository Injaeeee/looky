import styled from "styled-components";
import { Tag as ChakraTag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { useIsMobile } from "../../hooks/useIsMobile";

interface TagProps {
  label: string;
}

interface PostTagProps {
  category: string;
  price: number;
  name: string;
  onDelete?: () => void;
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
  const isMobile = useIsMobile();
  return (
    <ChakraTag
      sx={{
        border: "1px solid",
        borderColor: "var(--pink100)",
        background: "var(--pink10)",
        borderRadius: "2px",
        height: "30px",
        padding: isMobile ? "3px" : "8px",
      }}
    >
      <PinkLabel>{label}</PinkLabel>
    </ChakraTag>
  );
}
export function BlurTag({ category, price, name, onDelete }: PostTagProps) {
  const isMobile = useIsMobile();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ko-KR").format(price);

  return (
    <ChakraTag
      sx={{
        border: "1px solid",
        borderColor: "var(--gray500)",
        background: "var(--gray10)",
        borderRadius: "4px",
        padding: isMobile ? "3px" : "9px",
        position: "relative",
      }}
    >
      {onDelete && (
        <TagCloseButton
          sx={{
            position: "absolute",
            top: "4px",
            right: "5px",
            color: "white",
          }}
          onClick={onDelete}
        />
      )}

      <LabelWrapper>
        <GrayLabel>{category}</GrayLabel>
        <GrayLabel>₩ {formatPrice(price)}</GrayLabel>
        <PinkLabel>{name}</PinkLabel>
      </LabelWrapper>
    </ChakraTag>
  );
}

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-right: 10px;
`;

const PinkLabel = styled(TagLabel)`
  color: var(--pink100);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  max-width: 100%;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const GrayLabel = styled(TagLabel)`
  color: var(--gray400);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  max-width: 100%;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
