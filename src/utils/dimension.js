import {Dimensions, Platform} from 'react-native';

// Width of Your MObile Screen.
const {width, height} = Dimensions.get('window');

// Standard width of mobile screen.
const STANDARD_WIDTH = 375;

// Width of your mobile screen.
const DEVICE_WIDTH = width;
const DEVICE_HEIGHT = height;

// Ratio of  YOUR MOBILE SCREEN/STANDARD WIDTH SCREEN.
const K = DEVICE_WIDTH / STANDARD_WIDTH;

const USE_FOR_BIGGER_SIZE = true;

// So,dynamicSize is used to set width,Height of Card,Block,Images,etc.
export function dynamicSize(size) {
  var adjustSize = size;
  if (Platform.OS === 'ios' ? adjustSize : K * adjustSize) return adjustSize;
}

// And getFontSize is used for fontSize of the Text.
export function getFontSize(size) {
  if (USE_FOR_BIGGER_SIZE || CURRENT_WIDTH < STANDARD_WIDTH) {
    const newSize = dynamicSize(size);
    return newSize;
  }

  return size;
}

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;
