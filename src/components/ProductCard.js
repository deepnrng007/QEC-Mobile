import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Dimension, Font, Strings, Theme, Utils} from '../utils';
import Arrow from '../assets/images/arrow.svg';
import Clock from '../assets/images/clock.svg';

const ProductCard = ({itemData, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardWrapper}>
        <Text style={styles.cardTitle}>{itemData.projectName}</Text>
        <View style={styles.sprintWrapper}>
          <Clock />
          <Text style={styles.sprintText}>{Strings.text.sprint_duration}</Text>
          <Text style={styles.sprintDate}>
            `{Utils.getMonthFromDate(itemData.lastSprintStartDate)} -
            {Utils.getMonthFromDate(itemData.lastSprintEndDate)}`
          </Text>
        </View>
      </View>
      <Arrow style={{marginEnd: 20}} />
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    height: Dimension.screenHeight / 10,
    marginVertical: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E8E9',
    borderRadius: 10,
    alignItems: 'center',
  },
  cardWrapper: {paddingHorizontal: 14, flex: 1},

  sprintWrapper: {flexDirection: 'row', marginTop: 5, alignItems: 'center'},
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: Theme.colors.primary,
    fontFamily: Font.notoBold,
  },
  sprintText: {
    paddingLeft: 5,
    fontWeight: '600',
    fontFamily: Font.notoBold,
    color: Theme.colors.black,
  },
  sprintDate: {
    paddingLeft: 5,
    fontFamily: Font.notoRegular,
    color: Theme.colors.black,
  },
});
