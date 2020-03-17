export const messageAlertSelector = state => ({
  ...state.messageAlert.toJS(),
});

export const messageAlertVisibleSelector = state => state.messageAlert.get('visible');
