const myActivitySelector = state => ({
  userInfo: state.login.get('userInfo') ? state.login.get('userInfo').toJS() : null,
  myActivity: state.home.get('myActivity') ? state.home.get('myActivity').toJS() : null,
});

export default myActivitySelector;
