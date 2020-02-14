import {
  GET_SERVICES,
  STORE_SERVICES,
  CHECK_SERVICE_REQUEST_CONDITION,
  STORE_SERVICE_REQUEST_CONDITION,
  RESET_SERVICE_REQUEST_CONDITION,
} from './ServicesConstants';

export function fetchServices(payload) {
  return {
    type: GET_SERVICES,
    payload,
  };
}

export function storeServices(response) {
  return {
    type: STORE_SERVICES,
    payload: { response },
  };
}

export function checkServiceRequestCondition(serviceId, currentLocationId) {
  return {
    type: CHECK_SERVICE_REQUEST_CONDITION,
    serviceId,
    currentLocationId,
  };
}


export function storeServiceRequestCondition(response) {
  return {
    type: STORE_SERVICE_REQUEST_CONDITION,
    payload: { response },
  };
}

export function resetServiceRequestCondition() {
  return {
    type: RESET_SERVICE_REQUEST_CONDITION,
  };
}
