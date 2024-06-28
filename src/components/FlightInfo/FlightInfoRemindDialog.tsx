import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';

type Props = {
  flightNumber: string
  onSubmit: () => void
  onCancel: () => void
} & DialogProps

export function FlightInfoRemindDialog({ flightNumber, onSubmit, onCancel, ...restProps }: Props) {
  return (
    <Dialog {...restProps}>
      <DialogTitle>
        查不到「{flightNumber}」航班資訊
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          請確認航班資訊、起飛時間等，你也可以直接填寫此航班作為機場接送資訊。
        </DialogContentText>
        <Stack mt={2} spacing={2}>
          <Button variant='contained' onClick={onSubmit}>確認航班資訊，並送出</Button>
          <Button onClick={onCancel}>重新填寫</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
