import 'whatwg-fetch';
import { showMessageAlert } from '../containers/MessageAlert/MessageAlert.actions';
import { store } from '../index';

// Global handling for each specific response status code can be directly written under each case.
const GLOBAL_RESPONSE_STATUS_CODE_HANDLERS = {
  // Unauthorized
  401: () => {
    localStorage.removeItem('coworks-accessToken-remember');
    localStorage.removeItem('userId');
    store.dispatch(
      showMessageAlert({
        message: 'Invalid Credentials',
        visible: true,
        color: '#e53e3d',
      }),
    );
    return false;
  },
  503: () => {
    store.dispatch(
      showMessageAlert({
        message: 'Server down! Please try later',
        visible: true,
        color: '#e53e3d',
      }),
    );
    return false;
  },
};

const redirectToLoginPage = () => {
  localStorage.removeItem('coworks-accessToken-remember');
  localStorage.removeItem('userId');
  store.dispatch(
    showMessageAlert({
      message: 'Invalid Credentials',
      visible: true,
      color: '#e53e3d',
    }),
  );
};

/**
 *
 * @param url
 * @param options
 * @param callback
 * @param tokenRequired
 * @returns {Function}
 */

export default function request(url, options, callback, tokenRequired = true, formData = false) {
  if ((tokenRequired && localStorage.getItem('coworks-accessToken-remember')) || !tokenRequired) {
    options.body = typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body;
    let defaultHeaders = {};
    if (formData) {
      defaultHeaders = {
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'multipart/form-data',
      };
    } else {
      defaultHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    if (tokenRequired) {
      options.headers = {
        Authorization: localStorage.getItem('coworks-accessToken-remember'),
      };
    }
    options.headers = options.headers
      ? Object.assign({}, defaultHeaders, options.headers)
      : defaultHeaders;
    let statusCode, responseStatus, responseStatusCode;
    return fetch(url, {
      credentials: 'same-origin',
      ...options,
    })
      .then(checkStatus)
      .then(response => {
        statusCode = response.status;
        if (statusCode === 401) {
          redirectToLoginPage();
          return;
        }
        responseStatus = statusCode >= 200 && statusCode < 300 ? 'onSuccess' : 'onError';
        responseStatusCode = statusCode.toString();
        return response.json();
      })
      .then(resp => {
        if (responseStatus in callback) {
          callback[responseStatus](resp);
        }
        if (responseStatusCode in GLOBAL_RESPONSE_STATUS_CODE_HANDLERS) {
          GLOBAL_RESPONSE_STATUS_CODE_HANDLERS[responseStatusCode](resp);
        }
        // Custom handling for each specific response status code is done based on whether
        // the specific response code keys are present in the callback object or not.
        if (responseStatusCode in callback) {
          callback[responseStatusCode](resp);
        }
        return resp;
      });
  }
}

/**
 * For 502 we will not get JSON response, hence throw error
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
  if (response.status !== 503) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
