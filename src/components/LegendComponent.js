import React from 'react';
import {View} from 'react-native';
import {Dimension} from '../utils';
import LegendCard from './LegendCard';

const LegendComponent = ({data}) => {
  const renderCard = data.map(item => {
    return <LegendCard text={item.name} color={item.color} />;
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: getFlexDirection(data),
        marginVertical: Dimension.dynamicSize(8),
      }}>
      {renderCard}
    </View>
  );
};

const getFlexDirection = data => {
  return data.length == 2 ? 'row' : 'column';
};

export default LegendComponent;
