const updateProfileSelector = state => ({
  userProfile: (state.home.get('profile') && state.home.get('profile').get('user')) ? state.home.get('profile').get('user').toJS() : null,
});

export default updateProfileSelector;
