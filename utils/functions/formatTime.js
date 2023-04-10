import dayjs from 'dayjs';

export const _handleMinMaxDay = () => {
  return {
    minDate: dayjs().subtract(3, 'M').format('DD MMM YYYY'),
    maxDate: dayjs().add(3, 'M').format('DD MMM YYYY'),
  }
}

export const _handleFormatTime = (time, characterSplit) => {
  let result = time;

  if (time) {
    const listTime = time.split(characterSplit);
    if (listTime[0].length == 2) {
      result = `${listTime[2]}-${listTime[1]}-${listTime[0]}`;
    }
  }

  return result;
}