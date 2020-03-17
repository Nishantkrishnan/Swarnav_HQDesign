const bookServiceSelector = state => ({
  serviceRequestPreference: state.home.get('serviceRequestPreference') ? state.home.get('serviceRequestPreference').toJS() : null,
  showLoader: state.home.get('showLoader'),
  currentLocation: state.home.get('currentLocation') ? state.home.get('currentLocation') : null,
});

export default bookServiceSelector;
