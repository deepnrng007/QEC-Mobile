import {StyleSheet} from 'react-native';
import {colors} from '../utils/Theme';
import {Dimension, Font, Theme} from '../utils';

const BarchartStyles = StyleSheet.create({
  parentViewStyle: {
    shadowColor: 'black',
    shadowOpacity: 0.16,
    shadowOffset: {
      width: Dimension.dynamicSize(0),
      height: Dimension.dynamicSize(1),
    },
    shadowRadius: Dimension.dynamicSize(1),
    backgroundColor: 'white',
    marginHorizontal: Dimension.dynamicSize(24),
    borderColor: colors.progressGray,
    borderWidth: Dimension.dynamicSize(1),
    borderRadius: Dimension.dynamicSize(8),
    width: Dimension.screenWidth - 50,
    paddingLeft: Dimension.dynamicSize(16),
    paddingRight: Dimension.dynamicSize(19),
  },
  headerStyle: {
    fontSize: Dimension.dynamicSize(16),
    paddingTop: Dimension.dynamicSize(20),
    paddingLeft: Dimension.dynamicSize(18),
    paddingBottom: Dimension.dynamicSize(10),
    fontFamily: Font.notoSemiBold,
    color: Theme.colors.black,
  },
  sharedAxisStyle: {
    tickLabels: {
      fontSize: Dimension.dynamicSize(13),
    },
    axisLabel: {
      padding: Dimension.dynamicSize(35),
      fontSize: Dimension.dynamicSize(12),
      fontStyle: 'italic',
    },
    axis: {stroke: Theme.colors.transparent},
    ticks: {stroke: '#000'},
    tickLabels: {fill: '#000'},
    grid: {stroke: '#B1B9BC', strokeWidth: 1, strokeDasharray: '1'},
  },
});

export default BarchartStyles;
