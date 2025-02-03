import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
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
              <img src="/icon/home.svg" alt="home" width="20px" />홈
            </RouterButton>
            <RouterButton to="/list">
              <img src="/icon/article.svg" alt="article" width="18px" />
              게시물
            </RouterButton>
            <RouterButton to="/ranking">
              <img src="/icon/ranking.svg" alt="ranking" width="23px" />
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
  font-size: 17px;
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
