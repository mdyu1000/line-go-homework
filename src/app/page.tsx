'use client'
import { Box, Stack, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

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
    .required('姓名為必填'),
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
  const { control, handleSubmit, formState: { errors } } = useForm<FlightOrderForm>({
    defaultValues: {
      flightNumber: "",
      passengerName: "",
      passengerPhone: "",
      passengerId: "",
      passengerRemarks: "",
    },
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FlightOrderForm> = (data) => {
    console.log(data)
  }

  return (
    <Box
      minWidth={375}
      maxWidth={768}
      mx="auto"
      px={2.5}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography mt={2} fontWeight='bold' textAlign='center' fontSize="1.3rem">
        送機行程
      </Typography>
      <Box mt={2}>
        <Typography>送機計畫</Typography>
        <Stack mt={2} spacing={2.5}>
          <TextField label="下車機場" defaultValue="桃園國際機場 第一航廈" disabled />
          <Controller
            name="flightNumber"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField {...field} label="航班編號" error={!!error} helperText={error?.message} />
            )}
          />
        </Stack>
      </Box>
      <Box mt={2}>
        <Typography>旅客資訊</Typography>
        <Stack mt={2} spacing={2.5}>
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
              <TextField {...field} label="電話" error={!!error} helperText={error?.message} />
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
        </Stack>
      </Box>
      <Box my={2.5}>
        <Button type='submit' variant="contained" fullWidth>下一步</Button>
      </Box>
    </Box>
  );
}
