import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Dimension, Strings, Theme} from '../utils';
import Search from '../assets/images/search.svg';

const CustomSearchBar = ({ontextChange}) => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.parentView}>
      <Search />
      <TextInput
        placeholder={Strings.text.search_for_product}
        onChangeText={text => {
          setValue(text);
          ontextChange(text);
        }}
        on
        value={value}
        style={styles.textInput}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flexDirection: 'row',
    marginStart: Dimension.dynamicSize(24),
    padding: Dimension.dynamicSize(5),
    paddingStart: Dimension.dynamicSize(10),
    borderColor: Theme.colors.gray,
    borderWidth: Dimension.dynamicSize(1),
    borderRadius: Dimension.dynamicSize(10),
    width: Dimension.screenWidth - 48,
    alignItems: 'center',
  },
  textInput: {
    padding: Dimension.dynamicSize(5),
    alignSelf: 'center',
    fontSize: 15,
    paddingStart: Dimension.dynamicSize(10),
  },
});

export default CustomSearchBar;
