import styled from "styled-components";
import { ButtonHTMLAttributes } from "react";

type PinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: "white" | "black";
};

export function PinkButton({
  children,
  color = "black",
  ...props
}: PinkButtonProps) {
  return (
    <Button color={color} {...props}>
      {children}
    </Button>
  );
}

export function PinkBorderButton({ children, ...props }: PinkButtonProps) {
  return <BorderButton {...props}> {children}</BorderButton>;
}

const Button = styled.button<{ color: "white" | "black" }>`
  background-color: var(--pink100);
  color: ${({ color }) => (color === "white" ? "white" : "black")};
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  border-radius: 6px;
  padding: 7px 12px;

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 18px;
    font-weight: 600;
    border-radius: 6px;
    padding: 5px 10px;
  }
`;

const BorderButton = styled.button`
  border: 1px solid var(--pink100);
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  border-radius: 6px;
  color: var(--pink100);
  padding: 7px 12px;

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 18px;
    font-weight: 600;
    border-radius: 6px;
    padding: 5px 10px;
  }
`;
