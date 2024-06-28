'use client'
import { Box, Stack, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler } from "react-hook-form"

interface FlightOrder {
  flightNumber: string,
  passengerName: string,
  passengerPhone: string,
  passengerId: string,
  passengerRemarks: string,
}

export default function Home() {
  const { control, handleSubmit } = useForm<FlightOrder>({
    defaultValues: {
      flightNumber: "",
      passengerName: "",
      passengerPhone: "",
      passengerId: "",
      passengerRemarks: "",
    },
  })

  const onSubmit: SubmitHandler<FlightOrder> = (data) => {
    console.log(data)
  }

  return (
    <Box
      minWidth={375}
      maxWidth={768}
      height='100vh'
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
            render={({ field }) => <TextField {...field} label="航班編號" />}
          />
        </Stack>
      </Box>
      <Box mt={2}>
        <Typography>旅客資訊</Typography>
        <Stack mt={2} spacing={2.5}>
          <Controller
            name="passengerName"
            control={control}
            render={({ field }) => <TextField {...field} label="姓名" />}
          />
          <Controller
            name="passengerPhone"
            control={control}
            render={({ field }) => <TextField {...field} label="電話" />}
          />
          <Controller
            name="passengerId"
            control={control}
            render={({ field }) => <TextField {...field} label="身分證字號/護照編號" />}
          />
          <Controller
            name="passengerRemarks"
            control={control}
            render={({ field }) => <TextField {...field} label="乘車備註" multiline rows={4} />}
          />
        </Stack>
      </Box>
      <Box mt={2.5}>
        <Button variant="contained" fullWidth>下一步</Button>
      </Box>
    </Box>
  );
}
