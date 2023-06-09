import * as Actions from './ActionTypes';
import {API, Urls} from '../../api';
import {Strings, Utils} from '../../utils';

export const getDashBoard = () => async dispatch => {
  try {
    dispatch({type: Actions.GET_DASHBOARD});

    const response = await API.GET(Urls.DASHBOARD);
    dispatch({type: Actions.GET_DASHBOARD_SUCCESS, payload: response.data});
  } catch (error) {
    Utils.showShortToast(Strings.error.data);
    dispatch({
      type: Actions.GET_USERS_ERROR,
      payload: console.log(`Error in fetching home products - ${error}`),
    });
  }
};

export const getProducts = () => async dispatch => {
  try {
    dispatch({type: Actions.GET_PRODUCTS});
    const response = await API.GET(Urls.PRODUCTS);
    dispatch({type: Actions.GET_PRODUCTS_SUCCESS, payload: response.data});
  } catch (error) {
    Utils.showShortToast(Strings.error.fetchProducts);
    dispatch({
      type: Actions.GET_USERS_ERROR,
      payload: console.log(`Error in fetching products - ${error}`),
    });
  }
};

export const addProduct =
  (productName, url, username, apiKey, productManager) => async dispatch => {
    try {
      dispatch({type: Actions.ADD_PRODUCT});
      const data = {
        productName: productName,
        jiraUrl: url,
        principalUserName: username,
        apiKey: apiKey,
        productManager: productManager,
      };
      const response = await API.POST(Urls.PRODUCTS, data);
      dispatch({type: Actions.ADD_PRODUCT_SUCCESS, payload: response.data});
    } catch (error) {
      Utils.showShortToast(Strings.error.addProduct);
      dispatch({
        type: Actions.GET_USERS_ERROR,
        payload: console.log(`Error in adding product - ${error}`),
      });
    }
  };

export const addProject = (productName, projectName) => async dispatch => {
  try {
    const data = {
      productName: productName,
      projectName: projectName,
    };
    const response = await API.GET(Urls.ADD_PROJECT, data);
    dispatch({type: Actions.ADD_PROJECT, payload: response.data});
    dispatch({type: Actions.RESET_PRODUCTS});
  } catch (error) {
    Utils.showShortToast(Strings.error.addProject);
    dispatch({
      type: Actions.GET_USERS_ERROR,
      payload: console.log(`Error in adding project - ${error}`),
    });
  }
};

export const syncProduct = (productId, productName) => async dispatch => {
  try {
    dispatch({type: Actions.SYNC_DATA, payload: productName});
    const response = await API.GET(Urls.SYNC, {
      pId: productId,
    });
    dispatch({type: Actions.SYNC_SUCCESS, payload: response});
  } catch (e) {
    Utils.showShortToast(Strings.error.syncProdut);
    dispatch({
      type: Actions.GET_USERS_ERROR,
      payload: console.log(`Error in Syncing products`),
    });
  }
};

export const resetDashboard = () => dispatch => {
  dispatch({type: Actions.RESET_DASHBOARD});
};

export const resetProducts = () => dispatch => {
  dispatch({type: Actions.RESET_PRODUCTS});
};
