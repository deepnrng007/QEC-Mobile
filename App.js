import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import store from './src/redux/reducers/index';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {Constants, Storage, Theme} from './src/utils';
import AppStatusBar from './src/components/common/AppStatusBar';
import {AUTH, TAB_STACK} from './src/navigation/NavigationNames';

const THEME_COLOR = Theme.colors.logoutColor;

const App = () => {
  const [hasToken, setHasToken] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(async () => {
    const token = await Storage.getDataFromStorage(Constants.AUTH_TOKEN);
    setHasToken(token != null && token.length > 0);
    setLoaded(true);
  }, []);
  if (!isLoaded) {
    return null;
  }
  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.bottomSafeArea}>
        <AppStatusBar backgroundColor={THEME_COLOR} />
        <Provider store={store}>
          <NavigationContainer>
            <StackNavigator initialRoute={hasToken ? TAB_STACK : AUTH} />
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor:
      Platform.OS === 'android' ? THEME_COLOR : Theme.colors.white,
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
});

export default App;
