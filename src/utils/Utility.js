import moment from 'moment';
import Toast from 'react-native-simple-toast';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getMonthFromDate = date => {
  const d = new Date(date);
  const month = monthNames[d.getMonth()];
  const day = d.getDate();
  return `${day} ${month}`;
};

export const getYearFromDate = date => {
  const d = new Date(date);
  return d.getFullYear();
};

export const isValidURL = value => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(value);
};

export const getSyncTime = time => {
  const lastSynced = moment.utc(time).local().startOf('seconds').fromNow();

  return lastSynced;
};

export const showShortToast = message => {
  Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
};
