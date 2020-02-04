const feedbackSelector = state => ({
  showLoader: state.home.get('showLoader'),
  locations: state.home.get('locations') ? state.home.get('locations').toJS() : null,
});

export default feedbackSelector;
