import {Axios} from '.';
import {Strings} from '../utils';

export const GET = async (endpoint, params) => {
  try {
    if (params !== null) {
      endpoint = updateEndpoint(endpoint, params);
    }
    const response = await Axios.instance.get(endpoint);
    if (response.status === 200) {
      return response;
    }
    return {error: Strings.error.something_went_wrong};
  } catch (error) {
    throw error;
  }
};

export const POST = async (endpoint, data) => {
  try {
    const response = await Axios.instance.post(endpoint, data);
    if (response.status === 200) {
      return response;
    }
    return {error: Strings.error.something_went_wrong};
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const POST_RAW = async (endpoint, data) => {
  try {
    const response = await Axios.instance.post(endpoint, data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateEndpoint = (endpoint, params) => {
  if (params != null) {
    const keys = Object.keys(params);
    keys.forEach((key, index) => {
      if (index == 0) endpoint += `?`;
      else endpoint += `&`;
      endpoint += `${key}=${params[key]}`;
    });
  }
  return endpoint;
};
