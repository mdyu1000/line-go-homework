import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Stack, Typography } from '@mui/material';

export function FlightInfoSuccessDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <Stack alignItems='center'>
          <CheckCircleOutlineIcon sx={{ color: '#1aae9f', fontSize: '60px' }} />
          <Typography mt={1}>完成送機行程</Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
