import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { RefObject } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leastDestructiveRef: RefObject<HTMLButtonElement>;
  content: string;
}

export default function Dialog({
  isOpen,
  onClose,
  onConfirm,
  content,
  leastDestructiveRef,
}: DialogProps) {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg="var(--gray900)" color="var(--pink100)">
          <AlertDialogHeader>{content}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>삭제 후엔 되돌릴 수 없습니다.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={leastDestructiveRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onConfirm}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
