import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveInStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`Error saving async data: ${err}`);
  }
};

export const getDataFromStorage = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
