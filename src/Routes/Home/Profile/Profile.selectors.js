const profileSelector = state => ({
  profile: state.home.get('profile') ? state.home.get('profile').toJS() : null,
});

export default profileSelector;
