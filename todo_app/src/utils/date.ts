import {DateTime} from 'luxon';

export const convertDateStringToDateSinceEpoch = (
  dateString: string,
): number => {
  return DateTime.fromISO(dateString).toMillis();
};

export const convertDateSinceEpochToDateTime = (
  dateSinceEpoch: number,
): DateTime => {
  return DateTime.fromMillis(dateSinceEpoch);
};
