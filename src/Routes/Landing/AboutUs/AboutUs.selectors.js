const aboutUsSelector = state => ({
  userInfo: state.login.get('userInfo') ? state.login.get('userInfo').toJS() : null,
  aboutUs: state.landing.get('aboutUs') ? state.landing.get('aboutUs').toJS() : null,
});

export default aboutUsSelector;
