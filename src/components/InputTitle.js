import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dimension, Font, Theme} from '../utils';

const InputTitle = ({required = false, title, style}) => {
  return (
    <View style={[style, {flexDirection: 'row'}]}>
      <Text style={styles.title}>{title}</Text>
      {required ? <Text style={{color: 'red'}}> *</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Dimension.dynamicSize(14),
    fontWeight: '600',
    fontFamily: Font.notoSemiBold,
    color: Theme.colors.textColor,
  },
});

export default InputTitle;
