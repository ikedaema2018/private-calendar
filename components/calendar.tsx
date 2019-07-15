import { DateTime } from 'luxon';
import { Container, Table } from 'react-bootstrap';
import { useState } from 'react';

interface Props {
  year?: number;
  month?: number;
};

interface Day {
  dateNum?: number;
}

export default function Calendar(props: Props) {
  let { year, month } = props;
  if (!year) year = DateTime.local().year;
  if (!month) month = DateTime.local().month;

  const [ days ] = useState(createInitializeDays(year, month));

  return (
    <Container>
      <Table className='table-bordered'>
        <thead>
          <tr>
            <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
          </tr>
        </thead>
        <tbody>
          {createCalendarWeeks()}
        </tbody>
      </Table>
    </Container>
  );

  function createCalendarWeek(weekNumOfMonth: number) {
    const firstDate = weekNumOfMonth * 7;
    const lastDate = weekNumOfMonth * 7 + 7;
    return (
      <tr key={weekNumOfMonth}>
        {days.slice(firstDate, lastDate).map(day => ((
            <td key={Math.random()}>
              {day.dateNum}
            </td>
          )))}
      </tr>
    );
  }

  function createCalendarWeeks() {
    const weeks = [];
    for (let i = 0; i < 6; i++) {
      weeks.push(createCalendarWeek(i));
    }
    return weeks;
  }
}

export enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}


function createInitializeDays(year: number, month: number) {
  const firstWeekDay = DateTime.local(year, month, 1, 0, 0).weekday;

  const firstDayLocation = (() => {
    switch (firstWeekDay) {
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 4;
      case 4:
        return 5;
      case 5:
        return 6;
      case 6:
        return 7;
      case 7:
        return 1;
      default:
        return 1;
    }
  })();

  const daysOfMonth = (() => {
    if (month === 2) {
      if (year % 4 === 0) {
        if (year % 100 === 0 && year % 400 !== 0) {
          return 29;
        } else {
          return 28;
        }
      }
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
      return 30;
    } else {
      return 31;
    }
  })();

  const initialDays = (() => {
    const calendarBoxSize = 42;
    const days = [];
    let dayCount = 1;
    for (let i = 1; i <= calendarBoxSize; i++) {
      const day: Day = {};
      if (i >= firstDayLocation && dayCount <= daysOfMonth!) {
        day.dateNum = dayCount;
        dayCount++;
      }
      days.push(day);
    }
    return days;
  })();

  return initialDays;
}