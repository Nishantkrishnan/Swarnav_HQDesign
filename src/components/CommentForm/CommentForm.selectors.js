export const dashboardSelector = state => ({
  profile: state.home.get('profile') ? state.home.get('profile').toJS() : null,
  posts: state.home.get('posts') ? state.home.get('posts').toJS() : null,
  hasMorePosts: state.home.get('hasMorePosts'),
});

export default dashboardSelector;
