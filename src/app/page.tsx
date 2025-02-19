'use client'
import { Box, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { KeyboardEvent, useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FlightInfoSuccessDialog } from "@/components/FlightInfo/FlightInfoSuccessDialog";
import { FlightInfoRemindDialog } from "@/components/FlightInfo/FlightInfoRemindDialog";
import { useDialog } from "@/hooks/useDialog";
import { FormSection } from "@/components/FlightInfo/FormSection";
import { useFlightInfo } from "@/hooks/useFlightInfo";

interface FlightOrderForm {
  flightNumber: string,
  passengerName: string,
  passengerPhone: string,
  passengerId: string,
  passengerRemarks?: string,
}

const schema = yup.object({
  flightNumber: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, '航班編號僅能接受英文字母大小寫與數字')
    .required('航班編號為必填'),
  passengerName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, '姓名僅能接受英文字母大小寫與空格')
    .required('姓名為必填')
    .test('non-empty', '姓名為必填', (value) => !!value && value.trim().length > 0),
  passengerPhone: yup
    .string()
    .matches(/^\d+$/, '電話僅能接受數字')
    .required('電話為必填'),
  passengerId: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, '身分證字號/護照編號僅能接受英文字母與數字')
    .required('身分證字號/護照編號為必填'),
  passengerRemarks: yup.string(),
});

export default function Home() {
  const { flightInfoMap, setFlightInfoMap, fetchFlightInfo, initFlightInfoMap } = useFlightInfo()
  useEffect(() => {
    initFlightInfoMap()
  }, [initFlightInfoMap])

  const [isWaiting, setIsWaiting] = useState(false)
  const { control, handleSubmit, watch, reset } = useForm<FlightOrderForm>({
    defaultValues: {
      flightNumber: "",
      passengerName: "",
      passengerPhone: "",
      passengerId: "",
      passengerRemarks: "",
    },
    resolver: yupResolver(schema),
  })
  const {
    isOpen: isOpenFlightInfoSuccessDialog,
    openDialog: openFlightInfoSuccessDialog,
    closeDialog: closeFlightInfoSuccessDialog,
  } = useDialog()
  const {
    isOpen: isOpenFlightInfoRemindDialog,
    openDialog: openFlightInfoRemindDialog,
    closeDialog: closeFlightInfoRemindDialog,
  } = useDialog()
  const onSubmit: SubmitHandler<FlightOrderForm> = async (data) => {
    const { flightNumber } = data

    let flightInfoMapDraft = flightInfoMap
    if (flightInfoMapDraft.size === 0) {
      try {
        setIsWaiting(true)
        flightInfoMapDraft = await fetchFlightInfo()
        setFlightInfoMap(flightInfoMapDraft)
      } catch (error) {
        console.error('fetchFlightInfo error', error)
      } finally {
        setIsWaiting(false)
      }
    }

    if (flightInfoMapDraft.has(flightNumber)) {
      openFlightInfoSuccessDialog()
    } else {
      openFlightInfoRemindDialog()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.target instanceof HTMLTextAreaElement) return
    if (event.key === 'Enter') event.preventDefault();
  };

  const watchFlightNumber = watch('flightNumber')

  return (
    <Box
      minWidth={375}
      maxWidth={768}
      mx="auto"
      px={2.5}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <Typography mt={2} fontWeight='bold' textAlign='center' fontSize="1.3rem">
        送機行程
      </Typography>
      <FormSection label="送機計畫">
        <TextField label="下車機場" defaultValue="桃園國際機場 第一航廈" disabled />
        <Controller
          name="flightNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="航班編號" error={!!error} helperText={error?.message} />
          )}
        />
      </FormSection>
      <FormSection label="旅客資訊">
        <Controller
          name="passengerName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="姓名" error={!!error} helperText={error?.message} />
          )}
        />
        <Controller
          name="passengerPhone"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="電話"
              error={!!error}
              helperText={error?.message}
              inputProps={{ inputMode: 'numeric' }}
            />
          )}
        />
        <Controller
          name="passengerId"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="身分證字號/護照編號" error={!!error} helperText={error?.message} />
          )}
        />
        <Controller
          name="passengerRemarks"
          control={control}
          render={({ field }) => <TextField {...field} label="乘車備註" multiline rows={4} />}
        />
      </FormSection>
      <Box my={2.5}>
        <Button type='submit' variant="contained" fullWidth>下一步</Button>
      </Box>

      <FlightInfoSuccessDialog
        open={isOpenFlightInfoSuccessDialog}
        onClose={() => closeFlightInfoSuccessDialog()}
        TransitionProps={{ onExit: () => reset() }}
      />
      <FlightInfoRemindDialog
        flightNumber={watchFlightNumber}
        open={isOpenFlightInfoRemindDialog}
        onClose={() => closeFlightInfoRemindDialog()}
        onSubmit={() => {
          closeFlightInfoRemindDialog()
          openFlightInfoSuccessDialog()
        }}
        onCancel={closeFlightInfoRemindDialog}
      />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isWaiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
