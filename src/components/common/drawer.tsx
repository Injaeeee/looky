import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BestRanking from "../bestRanking";

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent backgroundColor="var(--black10)">
        <DrawerCloseButton />
        <Body>
          <RouterWrapper>
            <RouterButton to="/">
              <Image src="/icon/home.svg" boxSize="15px" alt="home" />홈
            </RouterButton>
            <RouterButton to="/list">
              <Image src="/icon/article.svg" boxSize="13px" alt="article" />
              게시물
            </RouterButton>
            <RouterButton to="/ranking">
              <Image src="/icon/ranking.svg" boxSize="15px" alt="ranking" />
              랭킹
            </RouterButton>
          </RouterWrapper>
          <BestRanking />
        </Body>

        <DrawerFooter>© 2025 LOOKY All rights reserved</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const RouterButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  color: var(--pink100);
`;

const RouterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
`;

const Body = styled(DrawerBody)`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;
