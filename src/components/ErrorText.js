import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dimension, Font, Theme} from '../utils';

const ErrorText = ({text, style}) => {
  return <Text style={[styles.error, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  error: {
    fontSize: Dimension.dynamicSize(12),
    fontWeight: '400',
    fontFamily: Font.notoRegular,
    color: Theme.colors.errorColor,
    marginTop: Dimension.dynamicSize(8),
  },
});

export default ErrorText;
