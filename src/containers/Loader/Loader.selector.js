export const loaderSelector = state => ({
  ...state.loader.toJS(),
});

export const loaderCountSelector = state => state.loader.get('count');
