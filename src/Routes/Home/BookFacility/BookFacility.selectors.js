const bookFacilitySelector = state => ({
  availableMonths: (state.home.get('bookFacility') && state.home.get('bookFacility').get('availableMonths')) ?
    state.home.get('bookFacility').get('availableMonths').toJS() : null,
  availableDays: (state.home.get('bookFacility') && state.home.get('bookFacility').get('availableDays')) ?
    state.home.get('bookFacility').get('availableDays').toJS() : null,
  availableSlots: (state.home.get('bookFacility') && state.home.get('bookFacility').get('availableSlots')) ?
    state.home.get('bookFacility').get('availableSlots').toJS() : null,
  showLoader: state.home.get('showLoader'),
  currentLocation: state.home.get('currentLocation') ? state.home.get('currentLocation') : null,
});

export default bookFacilitySelector;
