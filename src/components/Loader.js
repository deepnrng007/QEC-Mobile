import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const Loader = ({loading}) => {
  return loading ? (
    <View style={styles.loaderWrapper}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator animating={loading} size="large" />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
