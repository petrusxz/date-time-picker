import { Day } from '../models/day.model';

/**
 * @description Returns an array with the days of the week from the dateParam
 */
export function getDaysOfTheWeek(dateParam: Date): Day[] {
    const days = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = dateParam;
    date.setDate(date.getDate() - date.getDay());
    date.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
        const weekDay = new Date(date);
        const dayNumber = weekDay.getDate();
        const isReadonly = weekDay < today;

        days.push({ weekDay, dayNumber, isReadonly });

        date.setDate(weekDay.getDate() + 1);
    }

    return days;
}

/**
 * @description Returns an array with the days of the week from the dateParam
 */
export function getWeekdayNames(language: string = 'en-US'): string[] {
    const weekdaysNames = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
        const weekDay = new Date(today);
        const shortName = weekDay.toLocaleDateString(language, { weekday: 'short' });
        weekdaysNames.push(shortName);

        today.setDate(weekDay.getDate() + 1);
    }

    return weekdaysNames;
}

export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}
