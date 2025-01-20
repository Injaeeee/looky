import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export function showToast({
  title,
  description,
  status = "info",
  duration = 5000,
  isClosable = true,
}: {
  title: string;
  description?: string;
  status?: "info" | "warning" | "success" | "error";
  duration?: number;
  isClosable?: boolean;
}) {
  toast({
    title,
    description,
    position: "top",
    status,
    duration,
    isClosable,
  });
}
