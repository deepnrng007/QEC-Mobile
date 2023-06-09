import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackIcon from '../../assets/images/back.svg';
import {Dimension, Font, Theme} from '../../utils';
import Logout from '../../assets/images/power.svg';

const Toolbar = ({
  title,
  showBack = false,
  showLogoutAction = false,
  onBackPressed,
  onLogoutPressed,
}) => {
  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity
          onPress={() => {
            onBackPressed();
          }}>
          <BackIcon style={styles.backButton} />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {showLogoutAction ? (
        <TouchableOpacity
          style={styles.logoutWrapper}
          onPress={onLogoutPressed}>
          <Logout />
          <Text style={styles.actionLogout}>Logout</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Dimension.dynamicSize(24),
    paddingVertical: Dimension.dynamicSize(12),
  },
  title: {
    fontSize: Dimension.dynamicSize(20),
    fontWeight: 'bold',
    fontFamily: Font.notoBold,
    flex: 1,
    color: Theme.colors.textColor,
  },
  backButton: {
    marginEnd: Dimension.dynamicSize(16),
  },
  actionLogout: {
    fontSize: Dimension.dynamicSize(12),
    fontFamily: Font.notoSemiBold,
    color: Theme.colors.logoutColor,
    paddingStart: Dimension.dynamicSize(6),
  },
  logoutWrapper: {flexDirection: 'row', alignItems: 'center'},
});

export default Toolbar;
