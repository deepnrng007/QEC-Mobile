import * as Actions from './ActionTypes';
import {API, Urls} from '../../api';
import {Strings, Utils} from '../../utils';

export const getReport = (productId, projectId) => async dispatch => {
  try {
    const response = await API.GET(Urls.REPORT, {
      reportProductFilter: `${productId}|${projectId}`,
    });

    dispatch({type: Actions.GET_REPORT, payload: response.data});
  } catch (error) {
    Utils.showShortToast(Strings.error.fetchReport);
    dispatch({
      type: Actions.REPORT_ERROR,
      payload: console.log(`Error in fetching report - ${error}`),
    });
  }
};

export const getProductSprint = (productId, projectId) => async dispatch => {
  try {
    const response = await API.GET(Urls.SPRINTS, {
      productId: productId,
      projectId: projectId,
    });
    dispatch({type: Actions.GET_SPRINT, payload: response.data});
  } catch (error) {
    Utils.showShortToast(Strings.error.fetchProductSprint);
    dispatch({
      type: Actions.SPRINT_ERROR,
      payload: console.log(`Error in fetching product sprint- ${error}`),
    });
  }
};

export const getSprintReport =
  (productId, projectId, sprintNames) => async dispatch => {
    try {
      const response = await API.GET(Urls.SPRINT_REPORT, {
        productId: productId,
        projectId: projectId,
        sprintNames: sprintNames,
      });
      dispatch({type: Actions.GET_SPRINT_REPORT, payload: response.data});
    } catch (error) {
      Utils.showShortToast(Strings.error.fetchReport);
      dispatch({
        type: Actions.SPRINT_ERROR,
        payload: console.log(`Error in fetching sprint report- ${error}`),
      });
    }
  };

export const resetReportData = () => dispatch => {
  dispatch({type: Actions.RESET_REPORT});
};
