import {StyleSheet} from 'react-native';
import {Dimension, Font, Theme} from '../../../utils';

const ProductScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  itemContainer: {
    borderColor: Theme.colors.borderColor,
    borderWidth: Dimension.dynamicSize(1),
    borderRadius: Dimension.dynamicSize(5),
    padding: Dimension.dynamicSize(14),
    marginBottom: Dimension.dynamicSize(10),
  },
  itemTitle: {
    fontSize: Dimension.dynamicSize(16),
    fontWeight: '600',
    fontFamily: Font.notoSemiBold,
    color: Theme.colors.textColor,
    marginEnd: Dimension.dynamicSize(6),
  },
  productUrl: {
    fontSize: Dimension.dynamicSize(12),
    fontWeight: '400',
    fontFamily: Font.notoRegular,
    color: Theme.colors.descColor,
    marginTop: Dimension.dynamicSize(4),
  },
  ownerContainer: {
    flexDirection: 'row',
    marginTop: Dimension.dynamicSize(34),
    alignItems: 'center',
  },
  ownerImage: {
    width: Dimension.dynamicSize(30),
    height: Dimension.dynamicSize(30),
    borderRadius: Dimension.dynamicSize(15),
  },
  ownerName: {
    fontSize: Dimension.dynamicSize(12),
    fontWeight: '400',
    fontFamily: Font.notoRegular,
    color: Theme.colors.textColor,
    marginHorizontal: Dimension.dynamicSize(8),
  },
  syncIcon: {
    position: 'absolute',
    right: 0,
    top: Dimension.dynamicSize(4),
  },
});

export default ProductScreenStyles;
