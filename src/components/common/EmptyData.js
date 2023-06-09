import React from 'react';
import {Image, Text, View} from 'react-native';
import {Font, Images, Theme} from '../../utils';

const EmptyDataScreen = ({message}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <Image
        source={Images.emptyBanner}
        style={{
          tintColor: Theme.colors.primary,
          paddingLeft: 10,
          height: 150,
          width: 150,
        }}
      />

      <Text style={{fontFamily: Font.notoSemiBold, fontSize: 15}}>
        {message}
      </Text>
    </View>
  );
};

export default EmptyDataScreen;
