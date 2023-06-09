import React from 'react';
import {View} from 'react-native';
import {Dimension} from '../../utils';
import ErrorText from '../ErrorText';
import InputTitle from '../InputTitle';
import QECDropDown from '../QECDropDown';

const FormDropdown = ({
  title,
  placeholder,
  value,
  setValue,
  list,
  showError,
}) => {
  return (
    <View>
      <InputTitle
        title={title}
        required={true}
        style={{marginVertical: Dimension.dynamicSize(8)}}
      />
      <QECDropDown
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        listItems={list}
      />
      {showError && value.length == 0 ? (
        <ErrorText text={`Please select ${title}`} style={{marginTop: 0}} />
      ) : null}
    </View>
  );
};

export default FormDropdown;
