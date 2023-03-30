import {DateTime} from 'luxon';

export const convertDateStringToDate = (dateString: string): DateTime => {
  return DateTime.fromISO(dateString);
};
