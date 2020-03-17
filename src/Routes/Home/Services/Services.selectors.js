const servicesSelector = state => ({
  serviceTypes: state.home.get('serviceTypes') ? state.home.get('serviceTypes') : null,
  serviceRequestCondition: state.home.get('serviceRequestCondition') ? state.home.get('serviceRequestCondition').toJS() : null,
  locations: state.home.get('locations') ? state.home.get('locations') : null,
  currentLocation: state.home.get('currentLocation') ? state.home.get('currentLocation') : null,
});

export default servicesSelector;
