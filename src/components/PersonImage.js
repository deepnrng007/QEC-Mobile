import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Dimension} from '../utils';
import PersonIcon from '../assets/images/person.svg';
import {PROFILE_PICTURES} from '../utils/image';

const PersonImage = ({url}) => {
  return (
    <View style={styles.container}>
      <PersonIcon style={styles.icon} />
      <FastImage style={styles.container} source={PROFILE_PICTURES[url]} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    alignSelf: 'center',
    top: 3,
  },
  container: {
    width: Dimension.dynamicSize(30),
    height: Dimension.dynamicSize(30),
    borderRadius: Dimension.dynamicSize(15),
  },
});

export default PersonImage;
