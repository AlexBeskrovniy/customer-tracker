export const dateInputValueFormater = (y: number, m: number, d: number): string => {
    //dayjs.month() returns month from zero index, fixed it here
    const month = (m + 1).toString().padStart(2, '0');
    const day = d.toString().padStart(2, '0');

    return `${y}-${month }-${day}`;
}