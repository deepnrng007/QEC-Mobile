import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimension, Font, Strings, Theme} from '../utils';

const CustomAlert = ({isVisible, onPress, setModalVisibility, titleText}) => {
  const toggleModalVisibility = () => {
    setModalVisibility(!isVisible);
  };
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      presentationStyle="overFullScreen"
      onDismiss={toggleModalVisibility}>
      <View style={styles.viewWrapper}>
        <View style={styles.modalView}>
          <Text style={styles.titleText}>{titleText}</Text>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => {
                onPress();
                setModalVisibility();
              }}
              style={styles.yesbutton}>
              <Text style={styles.yesbuttonText}>{Strings.names.yes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisibility();
              }}
              style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>{Strings.names.no}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [
      {translateX: -(Dimension.screenWidth * 0.4)},
      {translateY: -90},
    ],

    width: Dimension.screenWidth * 0.8,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  yesbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary,
    flex: 1,
    borderRadius: 8,
    height: 40,
    marginHorizontal: 20,
  },
  yesbuttonText: {
    color: Theme.colors.white,
    fontFamily: Font.notoBold,
    fontSize: 14,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 40,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: Theme.colors.borderColor,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontFamily: Font.notoBold,
    fontSize: 14,
  },
  buttonWrapper: {
    flexDirection: 'row',
    padding: 10,
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontFamily: Font.notoSemiBold,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
});
