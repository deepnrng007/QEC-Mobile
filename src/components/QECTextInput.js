import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Dimension, Font, Theme, Utils} from '../utils';
import ErrorText from './ErrorText';
import InputTitle from './InputTitle';

const QECTextInput = ({
  required = false,
  title,
  placeholder,
  showError = false,
  keyboardType = 'default',
  value,
  onChange,
  autoCapitalize = 'none',
}) => {
  const {hasError, text} = checkError(showError, value, title, keyboardType);

  return (
    <View style={styles.container}>
      <InputTitle title={title} required={required} />
      <TextInput
        style={styles.input}
        numberOfLines={1}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.placeholderColor}
        onChangeText={newText => onChange(newText)}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {hasError ? <ErrorText text={text} /> : null}
    </View>
  );
};

const checkError = (showError, value, title, keyboardType) => {
  if (showError) {
    if (value.length == 0) {
      return {hasError: true, text: `Please enter the ${title}`};
    } else if (keyboardType == 'url' && !Utils.isValidURL(value)) {
      return {hasError: true, text: `Please enter the valid ${title}`};
    }
  }
  return {hasError: false, text: ''};
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Dimension.dynamicSize(12),
  },
  input: {
    borderColor: Theme.colors.borderColor,
    fontWeight: '400',
    borderWidth: Dimension.dynamicSize(1),
    borderRadius: Dimension.dynamicSize(5),
    padding: Dimension.dynamicSize(12),
    fontFamily: Font.notoRegular,
    marginTop: Dimension.dynamicSize(8),
  },
  error: {
    fontSize: Dimension.dynamicSize(12),
    fontWeight: '400',
    fontFamily: Font.notoRegular,
    color: Theme.colors.errorColor,
    marginTop: Dimension.dynamicSize(8),
  },
});

export default QECTextInput;
