import { useState } from "react";
import styled from "styled-components";

interface CategoryType {
  id: number;
  name: string;
  src: string;
}

interface CategoryProps {
  category: CategoryType;
  isSelected: boolean;
  onClick: () => void;
}

const categories: CategoryType[] = [
  { id: 1, name: "OUTER", src: "https://bit.ly/dan-abramov" },
  { id: 2, name: "TOP", src: "https://bit.ly/ryan-florence" },
  { id: 3, name: "PANTS", src: "https://bit.ly/code-beast" },
  { id: 4, name: "NEAT", src: "https://bit.ly/kent-c-dodds" },
  { id: 5, name: "JEANS", src: "https://bit.ly/dan-abramov" },
  { id: 6, name: "CAP", src: "https://bit.ly/ryan-florence" },
  { id: 7, name: "SHOES", src: "https://bit.ly/code-beast" },
  { id: 8, name: "BAG", src: "https://bit.ly/kent-c-dodds" },
];

function Category({ category, isSelected, onClick }: CategoryProps) {
  return (
    <CategoryItem onClick={onClick}>
      <AvatarWrapper $isSelected={isSelected}>
        <CategoryAvatar src={category.src} alt={category.name} />
      </AvatarWrapper>
      <CategoryName $isSelected={isSelected}>{category.name}</CategoryName>
    </CategoryItem>
  );
}

export default function CategoryList() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (category: CategoryType) => {
    console.log("Clicked category:", category.name);
    setSelectedCategory(category.id);
  };

  return (
    <CategoryContainer>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          isSelected={selectedCategory === category.id}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const AvatarWrapper = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid
    ${({ $isSelected }) => ($isSelected ? "var(--pink100)" : "transparent")};
  border-radius: 50%;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: pink;
  }
`;

const CategoryAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const CategoryName = styled.span<{ $isSelected: boolean }>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ $isSelected }) => ($isSelected ? "var(--pink100)" : "White")};
  text-align: center;
`;
