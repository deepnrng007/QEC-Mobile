import * as Actions from './ActionTypes';
import {Constants, Storage, Strings, Utils} from '../../utils';
import {API, Urls} from '../../api';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

export const signIn = () => async dispatch => {
  GoogleSignin.configure({
    androidClientId: Config.ANDROID_CLIENT_ID,
    iosClientId: Config.IOS_CLIENT_ID,
    offlineAccess: true,
    webClientId: Config.WEB_CLIENT_ID,
  });

  GoogleSignin.hasPlayServices()
    .then(hasPlayService => {
      if (hasPlayService) {
        GoogleSignin.signIn()
          .then(async userInfo => {
            await Storage.saveInStorage(
              Constants.GOOGLE_TOKEN,
              userInfo.idToken,
            );
            dispatch({type: Actions.SIGN_IN, payload: true});
          })
          .catch(e => {
            dispatch({
              type: Actions.SIGNIN_ERROR,
              payload: console.log(
                `Error in google signin - ${JSON.stringify(e)}`,
              ),
            });
          });
      }
    })
    .catch(e => {
      dispatch({
        type: Actions.SIGNIN_ERROR,
        payload: console.log(
          `Error in google play service - ${JSON.stringify(e)}`,
        ),
      });
    });
};

export const authToken = () => async dispatch => {
  try {
    const idToken = await Storage.getDataFromStorage(Constants.GOOGLE_TOKEN);
    const response = await API.POST(Urls.AUTH, {tokenId: idToken});

    await Storage.saveInStorage(Constants.AUTH_TOKEN, response.data?.token);
    dispatch({type: Actions.AUTH, payload: true});
  } catch (error) {
    Utils.showShortToast(Strings.error.auth);
    dispatch({
      type: Actions.SIGNIN_ERROR,
      payload: console.log(`Error in authenticating token - ${error}`),
    });
  }
};

export const resetAuth = () => dispatch => {
  dispatch({type: Actions.RESET_AUTH});
};
