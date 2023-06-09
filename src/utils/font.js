import {Platform} from 'react-native';

export const notoBold =
  Platform.OS === 'android' ? 'NotoSans-Bold' : 'NotoSans-Bold';
export const notoRegular =
  Platform.OS === 'android' ? 'NotoSans-Regular' : 'NotoSans';
export const notoSemiBold =
  Platform.OS === 'android' ? 'NotoSans-SemiBold' : 'NotoSans-SemiBold';
export const notoMedium =
  Platform.OS === 'android' ? 'NotoSans-Medium' : 'NotoSans-Medium';
