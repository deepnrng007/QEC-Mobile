import {Dimensions} from 'react-native';
import {dynamicSize} from './dimension';

const colors = {
  accent: '#F3534A',
  primary: '#03B6D6',
  transparent: '#ffffff00',
  black: '#323643',
  gray: '#BEC1D2',
  gray2: '#898C95',
  shadowColor: '#353c3c',
  progressGray: '#dcdee0',
  placeholderColor: '#B1B9BC',
  red: '#FF0000',
  borderColor: '#E9E9E9',
  blueColor: '#04C0D8',
  downloadGreen: '#109869',
  logoutColor: '#05C6D9',
  borderColor: '#E0E8E9',
  textColor: '#161C1D',
  descColor: '#5D6364',
  placeholderColor: '#5d636499',
  errorColor: '#D91E18',
  white: '#FFFFFF',
  negativeButtonBorder: '#B1B9BC',
  negativeButtonText: '#5F6667',
  gradientColor1: '#03b6d6',
  gradientColor2: '#09e1e0',
  fabShadow: '#00a2bf',
  orange: '#F8B400',
  green: '#33a852',
  blue: '#3f84f4',
  red: '#cc4125',
  skyblue: '#47bec6',
};

const priorityColors = {
  red: '#d92b30',
  orange: '#f0712d',
  yellow: '#fabc2e',
  aqua: '#35e2ef',
  pureApple: '#6ab04c',
  darkGrey: '#a9a9a9',
  lightGrey: '#d1d1d1',
};

const sizes = {
  dropdownWidth: Dimensions.get('window').width - dynamicSize(48),
};

export {colors, priorityColors, sizes};
