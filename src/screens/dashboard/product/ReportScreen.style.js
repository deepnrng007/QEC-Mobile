import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/Theme';
import {Dimension, Font, Theme} from '../../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Theme.colors.white,
  },
  textStyle: {
    fontSize: Dimension.dynamicSize(20),
    fontWeight: '600',
    flex: 1,
    paddingBottom: Dimension.dynamicSize(10),
  },
  logoutTextStyle: {
    fontSize: Dimension.dynamicSize(15),
    fontFamily: Font.notoSemiBold,
    color: Theme.colors.black,
  },
  storyText: {
    fontSize: Dimension.dynamicSize(15),
    fontFamily: Font.notoMedium,
    color: Theme.colors.black,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: Dimension.dynamicSize(24),
    paddingVertical: Dimension.dynamicSize(10),
    alignItems: 'center',
  },
  listWrapper: {width: '100%', flex: 1},
  variableTextStyle: {
    color: colors.red,
    marginTop: 4,
    fontSize: 10,
  },
  variableTextStyleGreen: {
    color: Theme.colors.downloadGreen,
    fontSize: 10,
    marginTop: 4,
  },
  viewStyle: {flexDirection: 'row', flex: 1},
});

export default styles;
