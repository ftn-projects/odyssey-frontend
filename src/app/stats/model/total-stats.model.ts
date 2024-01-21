import { User } from "../../user/model/user.model";
import { MonthlyStats } from "./monthly-stats.model";


export interface TotalStats{
    start? : number;
    end? : number;
    host? : User;
    totalAccommodations? : number;
    totalReservations? : number;
    totalIncome? : number;
    monthlyStats? : MonthlyStats[];
}