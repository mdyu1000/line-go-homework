export interface FlightInfo {
    FlightDate: string;
    FlightNumber: string;
    AirlineID: string;
    DepartureAirportID: string;
    ArrivalAirportID: string;
    ScheduleDepartureTime: string;
    ActualDepartureTime: string;
    EstimatedDepartureTime: string;
    DepartureRemark: string;
    Terminal: string;
    Gate: string;
    IsCargo: boolean;
    CheckCounter: string;
    UpdateTime: string;
};
export type FlightInfoMap = Map<string, FlightInfo>