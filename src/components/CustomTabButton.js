import React from 'react';
import {View} from 'react-native';
import {Dimension} from '../utils';

const CustomTabButton = ({color, focused, icon}) => {
  return (
    <View style={{alignItems: 'center'}}>
      {icon}
      {focused ? (
        <View
          style={{
            backgroundColor: color,
            height: Dimension.dynamicSize(6),
            marginTop: Dimension.dynamicSize(10),
            width: Dimension.dynamicSize(60),
            borderRadius: Dimension.dynamicSize(5),
          }}
        />
      ) : null}
    </View>
  );
};

export default CustomTabButton;
