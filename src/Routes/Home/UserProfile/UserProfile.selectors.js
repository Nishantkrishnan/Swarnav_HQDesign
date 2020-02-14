const userProfileSelector = state => ({
  profile: state.home.get('profile') ? state.home.get('profile').toJS() : null,
  userProfile: state.home.get('userProfile') ? state.home.get('userProfile').toJS() : null,
});

export default userProfileSelector;
