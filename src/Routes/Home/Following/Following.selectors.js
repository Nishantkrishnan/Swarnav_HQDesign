const followingSelector = state => ({
  following: state.home.get('following') ? state.home.get('following').toJS() : null,
});

export default followingSelector;
