import { Box, BoxProps, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  label: string,
  children: ReactNode
}
export function FormSection({ label, children }: Props) {
  return (
    <Box mt={2}>
      <Typography>{label}</Typography>
      <Stack mt={2} spacing={2.5}>
        {children}
      </Stack>
    </Box>
  )
}