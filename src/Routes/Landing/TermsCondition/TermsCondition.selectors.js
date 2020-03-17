const termsConditionSelector = state => ({
  userInfo: state.login.get('userInfo') ? state.login.get('userInfo').toJS() : null,
  termsCondition: state.landing.get('termsCondition') ? state.landing.get('termsCondition').toJS() : null,
});

export default termsConditionSelector;
