import { Accommodation } from "../../accommodation/model/accommodation.model";
import { MonthlyStats } from "./monthly-stats.model";


export interface AccommodationTotalStats{
    start? : number;
    end? : number;
    totalReservations? : number;
    totalIncome? : number;
    accommodation? : Accommodation;
    monthlyStats? : MonthlyStats[];
}