import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DaysDateProvider implements IDateProvider {
    dateNow():Date {
        return dayjs().toDate();
    }

    addDays(days:number):Date {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours:number):Date {
        return dayjs().add(hours, "hour").toDate();
    }    

    compareIfBefore(startDate: Date, endDate: Date): boolean {
        return dayjs(startDate).isBefore(endDate);
    }
}

export { DaysDateProvider };