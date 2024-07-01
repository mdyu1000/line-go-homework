import { FLIGHT_INFO_API_URL } from "@/configs/FlightInfo"
import { FlightInfo, FlightInfoMap } from "@/types/FlightInfo"
import axios from "axios"
import { useCallback, useState } from "react"

export function useFlightInfo() {
  const [flightInfoMap, setFlightInfoMap] = useState<FlightInfoMap>(new Map())
  const fetchFlightInfo = async () => {
    const { data } = await axios.get<FlightInfo[]>(FLIGHT_INFO_API_URL)
    const newFlightInfoMap = data.reduce<FlightInfoMap>((acc, curr) => {
      const key = curr.AirlineID + curr.FlightNumber
      return acc.set(key, curr)
    }, new Map())
    return newFlightInfoMap
  }
  const initFlightInfoMap = useCallback(async () => {
    try {
      const newFlightInfoMap = await fetchFlightInfo()
      setFlightInfoMap(newFlightInfoMap)
    } catch (error) {
      console.error('initFlightInfoMap error', error)
    }
  }, [])

  return { flightInfoMap, setFlightInfoMap, initFlightInfoMap, fetchFlightInfo }
}