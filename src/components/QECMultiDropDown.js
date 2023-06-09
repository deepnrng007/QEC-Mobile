import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dimension, Theme} from '../utils';
import Clock from '../assets/images/clock.svg';
import {Font} from '../utils';

const QECMultiDropDown = ({
  placeholder,
  values,
  onChange,
  setSelectedValues,
  listItems,
  showClockIcon = false,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(listItems);
  return (
    <DropDownPicker
      placeholder={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: Platform.OS == 'ios' ? 5 : 0,
          }}>
          {showClockIcon ? <Clock /> : null}
          <Text style={styles.placeholderText}>{placeholder}</Text>
        </View>
      }
      containerStyle={styles.containerStyle}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      multiple={true}
      open={open}
      value={values}
      items={items}
      setOpen={setOpen}
      setValue={onChange}
      setItems={setItems}
      style={styles.dropdownStyle}
      listMode="SCROLLVIEW"
      onChangeValue={setSelectedValues}
      mode="BADGE"
      badgeTextStyle={{color: Theme.colors.white, fontWeight: 'bold'}}
      badgeColors={Theme.colors.logoutColor}
      badgeDotColors={Theme.colors.white}
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
    />
  );
};

export default QECMultiDropDown;

const styles = StyleSheet.create({
  placeholderText: {
    paddingStart: Dimension.dynamicSize(10),
    fontFamily: Font.notoRegular,
    color: Theme.colors.placeholderColor,
  },
  containerStyle: {
    alignSelf: 'center',
    width: Theme.sizes.dropdownWidth,
  },
  dropDownContainerStyle: {
    borderColor: Theme.colors.borderColor,
    maxHeight: Dimension.dynamicSize(150),
  },
  dropdownStyle: {
    borderColor: Theme.colors.borderColor,
    borderRadius: Dimension.dynamicSize(5),
  },
});
