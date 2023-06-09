import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Dimension, Font, Theme} from '../../utils';

const PositiveButton = ({title, onPressed, style}) => {
  return (
    <TouchableOpacity style={style} onPress={() => onPressed()}>
      <LinearGradient
        colors={[Theme.colors.gradientColor1, Theme.colors.gradientColor2]}
        style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Dimension.dynamicSize(30),
    paddingVertical: Dimension.dynamicSize(10),
    alignSelf: 'baseline',
    borderRadius: Dimension.dynamicSize(3),
  },
  title: {
    color: Theme.colors.white,
    fontWeight: '700',
    fontFamily: Font.notoSemiBold,
    fontSize: Dimension.dynamicSize(14),
  },
});

export default PositiveButton;
