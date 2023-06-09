import * as Actions from '../actions/ActionTypes';
import {Strings} from '../../utils';

const initialState = {
  dashboardData: [],
  products: [],
  addProductResponse: null,
  addProjectResponse: null,
  error: '',
  loading: false,
  syncLoading: false,
  syncProductName: '',
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_DASHBOARD: {
      return {...state, loading: true};
    }

    case Actions.GET_DASHBOARD_SUCCESS: {
      // excluded the products where productAttribute length is less than 0
      const list = action?.payload ?? [];
      const filteredList = list.filter(item => {
        return item.productAttributes.length > 0;
      });
      return {...state, dashboardData: filteredList, loading: false};
    }

    case Actions.GET_PRODUCTS: {
      return {...state, loading: true};
    }

    case Actions.GET_PRODUCTS_SUCCESS: {
      return {...state, products: action?.payload ?? [], loading: false};
    }

    case Actions.ADD_PRODUCT: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        addProductResponse: action?.payload ?? {},
        addProjectResponse: null,
        loading: false,
      };
    }

    case Actions.ADD_PROJECT: {
      return {
        ...state,
        addProjectResponse: action?.payload ?? {},
        addProductResponse: null,
      };
    }
    case Actions.SYNC_DATA: {
      return {
        ...state,
        syncLoading: true,
        syncProductName: action?.payload ?? '',
      };
    }
    case Actions.SYNC_SUCCESS: {
      return {
        ...state,
        message: action?.payload ?? Strings.text.sync_successfull,
        syncLoading: false,
        syncProductName: '',
      };
    }
    case Actions.RESET_DASHBOARD: {
      return initialState;
    }

    case Actions.RESET_PRODUCTS: {
      return {
        ...state,
        addProjectResponse: null,
        addProductResponse: null,
      };
    }

    case Actions.GET_USERS_ERROR: {
      return {
        ...state,
        error: action?.payload,
        loading: false,
        syncLoading: false,
        syncProductName: '',
      };
    }

    default:
      return state;
  }
};
export default ProductReducer;
