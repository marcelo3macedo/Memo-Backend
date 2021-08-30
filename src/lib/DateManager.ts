function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getDateAddDaysString(days) {
    const dateNow = new Date();
    return this.addDays(dateNow, parseInt(days));
}

const DateManager = {
    getDateAddDaysString,
    addDays
}

export default DateManager