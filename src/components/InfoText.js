import React from 'react';
import {Text, View} from 'react-native';
import {Tooltip} from 'react-native-elements';
import styles from '../screens/dashboard/product/ReportScreen.style';
import InfoIcon from '../assets/images/info.svg';
import {Dimension, Strings, Theme} from '../utils';
import RedArrowDown from '../assets/images/red_arrow_down.svg';
import RedArrowUp from '../assets/images/red_arrow_up.svg';
import GreenArrowUp from '../assets/images/green_arrow_up.svg';
import GreenArrowDown from '../assets/images/green_arrow_down.svg';

const InfoText = ({
  countVariation,
  text,
  optionalText,
  count,
  isPositive,
  tooltipText,
  tooltipData,
  showGreenArrowUp = true,
  showRedArrowDown = true,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.viewStyle}>
        <Text style={styles.logoutTextStyle}>{text}</Text>
        {optionalText ? (
          <Text
            style={[
              styles.storyText,
              {color: Theme.colors.gray2, fontWeight: '400', paddingStart: 6},
            ]}>
            {optionalText}
          </Text>
        ) : null}
      </View>

      <Text style={[styles.logoutTextStyle, {paddingEnd: 3}]}>
        {removeNegativeValue(count)}
      </Text>
      {countVariation ? (
        <Text style={variationStyle(isPositive)}>
          {removeNegativeValue(countVariation)}
        </Text>
      ) : null}
      {arrowIcon(
        isPositive,
        countVariation,
        showGreenArrowUp,
        showRedArrowDown,
      )}
      {tooltipText ? (
        <Tooltip
          popover={
            <View>
              <Text style={{color: Theme.colors.black}}>{tooltipText}</Text>
              {tooltipData != null ? showPriorityList(tooltipData) : null}
            </View>
          }
          withPointer={true}
          containerStyle={{
            height: null,
            position: 'absolute',
          }}
          pointerColor={Theme.colors.borderColor}
          backgroundColor={Theme.colors.borderColor}
          overlayColor={'#00000000'}
          skipAndroidStatusBar={true}>
          <InfoIcon style={{marginStart: 6}} />
        </Tooltip>
      ) : null}
    </View>
  );
};

const showPriorityList = tooltipData => {
  return (
    <View style={{marginTop: Dimension.dynamicSize(12)}}>
      {tooltipData.highest > 0
        ? getPriorityView(tooltipData, Strings.priorities.highest, 'red')
        : null}
      {tooltipData.blocker > 0
        ? getPriorityView(tooltipData, Strings.priorities.blocker, 'red')
        : null}
      {tooltipData.p1 > 0
        ? getPriorityView(tooltipData, Strings.priorities.p1, 'red')
        : null}
      {tooltipData.high > 0
        ? getPriorityView(tooltipData, Strings.priorities.high, 'orange')
        : null}
      {tooltipData.critical > 0
        ? getPriorityView(tooltipData, Strings.priorities.critical, 'orange')
        : null}
      {tooltipData.p2 > 0
        ? getPriorityView(tooltipData, Strings.priorities.p2, 'orange')
        : null}
      {tooltipData.medium > 0
        ? getPriorityView(tooltipData, Strings.priorities.medium, 'yellow')
        : null}
      {tooltipData.major > 0
        ? getPriorityView(tooltipData, Strings.priorities.major, 'yellow')
        : null}
      {tooltipData.p3 > 0
        ? getPriorityView(tooltipData, Strings.priorities.p3, 'yellow')
        : null}
      {tooltipData.low > 0
        ? getPriorityView(tooltipData, Strings.priorities.low, 'aqua')
        : null}
      {tooltipData.minor > 0
        ? getPriorityView(tooltipData, Strings.priorities.minor, 'aqua')
        : null}
      {tooltipData.p4 > 0
        ? getPriorityView(tooltipData, Strings.priorities.p4, 'aqua')
        : null}
      {tooltipData.lowest > 0
        ? getPriorityView(tooltipData, Strings.priorities.lowest, 'pureApple')
        : null}
      {tooltipData.trivial > 0
        ? getPriorityView(tooltipData, Strings.priorities.trivial, 'pureApple')
        : null}
      {tooltipData.p5 > 0
        ? getPriorityView(tooltipData, Strings.priorities.p5, 'pureApple')
        : null}
      {tooltipData.p6 > 0
        ? getPriorityView(tooltipData, Strings.priorities.p6, 'lightGrey')
        : null}
      {tooltipData.none > 0
        ? getPriorityView(tooltipData, Strings.priorities.none, 'darkGrey')
        : null}
    </View>
  );
};

const getPriorityView = (data, priority, color) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: Theme.priorityColors[color],
          marginEnd: 6,
        }}
      />
      <Text>{`${data[priority.toLowerCase()]} ${priority}`}</Text>
    </View>
  );
};

const arrowIcon = (
  isPositive,
  countVariation,
  showGreenArrowUp,
  showRedArrowDown,
) => {
  if (isPositive != null && countVariation != 0) {
    if (isPositive) {
      return showGreenArrowUp ? (
        <GreenArrowUp style={{marginTop: 4}} />
      ) : (
        <GreenArrowDown style={{marginTop: 4}} />
      );
    } else {
      return showRedArrowDown ? (
        <RedArrowDown style={{marginTop: 4}} />
      ) : (
        <RedArrowUp style={{marginTop: 4}} />
      );
    }
  } else {
    return null;
  }
};

const variationStyle = isPositive => {
  if (isPositive) {
    return styles.variableTextStyleGreen;
  } else {
    return styles.variableTextStyle;
  }
};

const removeNegativeValue = value => {
  try {
    const updatedValue = Math.abs(value);
    if (isNaN(updatedValue)) return value;
    else return updatedValue;
  } catch (e) {
    return value;
  }
};

export default InfoText;
