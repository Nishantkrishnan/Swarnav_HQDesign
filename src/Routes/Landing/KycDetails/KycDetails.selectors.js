const kycDetailsSelector = state => ({
  kycUserDetails: state.landing.get('kycUserDetails') ? state.landing.get('kycUserDetails') : null,
});

export default kycDetailsSelector;
