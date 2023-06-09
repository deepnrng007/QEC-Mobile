import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import GoogleLogo from '../assets/images/google.svg';
import {Dimension, Font, Strings, Theme} from '../utils';

const SocialButton = ({signIn}) => {
  return (
    <TouchableOpacity
      onPress={signIn}
      activeOpacity={0.7}
      style={styles.container}>
      <GoogleLogo
        width={Dimension.dynamicSize(24)}
        height={Dimension.dynamicSize(24)}
        style={styles.logo}
      />
      <View style={styles.verticaliLineView} />
      <Text style={styles.loginText}>{Strings.text.login_with_google}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginHorizontal: Dimension.dynamicSize(20),
  },
  loginText: {
    fontSize: 15,
    color: Theme.colors.blueColor,
    fontFamily: Font.notoSemiBold,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  verticaliLineView: {
    height: Dimension.dynamicSize(48),
    width: Dimension.dynamicSize(1),
    backgroundColor: Theme.colors.borderColor,
  },
  container: {
    width: Dimension.dynamicSize(295),
    height: Dimension.dynamicSize(48),
    borderWidth: Dimension.dynamicSize(1),
    borderRadius: Dimension.dynamicSize(5),
    borderColor: Theme.colors.borderColor,
    alignSelf: 'center',
    flexDirection: 'row',
  },
});

export default SocialButton;
