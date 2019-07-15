import { WeekDay } from '../components/calendar';

export function weekDayToText(weekDay: WeekDay) {
  switch (weekDay) {
    case WeekDay.Monday:
      return '月曜';
    case WeekDay.Thursday:
      return '火曜';
    case WeekDay.Wednesday:
      return '水曜';
    case WeekDay.Thursday:
      return '木曜';
    case WeekDay.Friday:
      return '金曜';
    case WeekDay.Saturday:
      return '土曜';
    case WeekDay.Sunday:
      return '日曜';

    default:
      return null;
  }
}
