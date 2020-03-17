const locationSelector = state => ({
  locations: state.home.get('locations') ? state.home.get('locations').toJS() : null,
  currentLocation: state.home.get('currentLocation') ? state.home.get('currentLocation').toJS() : null,
  displayLocation: state.home.get('displayLocation'),
  userProfile: state.home.get('profile'),
});

export default locationSelector;
