import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dimension, Theme} from '../utils';
import {Font} from '../utils';

const QECDropDown = ({placeholder, value, onChange, listItems}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(listItems);

  return (
    <DropDownPicker
      placeholder={placeholder}
      placeholderStyle={styles.placeholderStyle}
      containerStyle={styles.containerStyle}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={onChange}
      setItems={setItems}
      listMode="SCROLLVIEW"
      style={styles.dropdownStyle}
    />
  );
};

export default QECDropDown;

const styles = StyleSheet.create({
  normalText: {
    paddingStart: Dimension.dynamicSize(10),
    fontFamily: Font.notoRegular,
    color: Theme.colors.black,
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
  placeholderStyle: {
    color: Theme.colors.placeholderColor,
  },
});
