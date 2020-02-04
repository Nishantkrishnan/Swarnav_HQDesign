const facilitiesSelector = state => ({
  facilityTypes: state.home.get('facilityTypes') ? state.home.get('facilityTypes') : null,
  currentLocation: state.home.get('currentLocation') ? state.home.get('currentLocation') : null,
  displayLocation: state.home.get('displayLocation') ? state.home.get('displayLocation') : true,
});

export default facilitiesSelector;
