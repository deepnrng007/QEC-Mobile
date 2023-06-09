import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Dimension, Font, Theme} from '../../utils';

const NegativeButton = ({title, onPressed, style}) => {
  return (
    <TouchableOpacity style={style} onPress={() => onPressed()}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Dimension.dynamicSize(26),
    paddingVertical: Dimension.dynamicSize(9),
    alignSelf: 'baseline',
    borderRadius: Dimension.dynamicSize(3),
    borderColor: Theme.colors.negativeButtonBorder,
    borderWidth: Dimension.dynamicSize(1),
  },
  title: {
    color: Theme.colors.negativeButtonText,
    fontWeight: '600',
    fontFamily: Font.notoSemiBold,
    fontSize: Dimension.dynamicSize(14),
  },
});

export default NegativeButton;
