import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Dimension, Theme} from '../../utils';

const FAB = ({icon, onPressed}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Theme.colors.gradientColor1, Theme.colors.gradientColor2]}
        style={styles.gradient}>
        <TouchableOpacity
          onPress={() => {
            onPressed();
          }}>
          {icon}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimension.dynamicSize(56),
    height: Dimension.dynamicSize(56),
    position: 'absolute',
    bottom: Dimension.dynamicSize(36),
    end: Dimension.dynamicSize(36),
    shadowColor: Theme.colors.fabShadow,
    shadowOffset: {height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 0.4,
  },
  gradient: {
    width: Dimension.dynamicSize(56),
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimension.dynamicSize(56),
    position: 'absolute',
    bottom: Dimension.dynamicSize(0),
    end: Dimension.dynamicSize(0),
    borderRadius: Dimension.dynamicSize(28),
  },
});

export default FAB;
