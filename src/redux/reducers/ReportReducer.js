import * as Actions from '../actions/ActionTypes';
import {Strings} from '../../utils';

const initialState = {
  productReport: null,
  productSprint: [],
  error: '',
};

const ReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_REPORT: {
      return {...state, productReport: action?.payload ?? {}};
    }
    case Actions.GET_SPRINT: {
      return {...state, productSprint: action?.payload ?? []};
    }
    case Actions.GET_SPRINT_REPORT: {
      return {...state, productReport: action?.payload ?? {}};
    }
    case Actions.RESET_REPORT: {
      return initialState;
    }
    case Actions.REPORT_ERROR: {
      return {...state, error: Strings.error.something_went_wrong};
    }

    default:
      return state;
  }
};
export default ReportReducer;
