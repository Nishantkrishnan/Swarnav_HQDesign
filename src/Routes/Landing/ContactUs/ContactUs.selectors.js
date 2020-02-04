const contactUsSelector = state => ({
  userInfo: state.login.get('userInfo') ? state.login.get('userInfo').toJS() : null,
  contactUs: state.landing.get('contactUs') ? state.landing.get('contactUs').toJS() : null,
});

export default contactUsSelector;
