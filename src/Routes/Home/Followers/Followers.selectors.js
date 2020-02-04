const followersSelector = state => ({
  followers: state.home.get('followers') ? state.home.get('followers').toJS() : null,
});

export default followersSelector;
