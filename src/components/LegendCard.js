import React from 'react';
import {Text, View} from 'react-native';
import styles from '../screens/dashboard/product/ReportScreen.style';

const LegendCard = ({text, color}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={{backgroundColor: color, height: 10, width: 10}}></View>
      <Text style={{paddingLeft: 5}}>{text}</Text>
    </View>
  );
};
export default LegendCard;
