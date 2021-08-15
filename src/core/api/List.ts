const Rest = {
  // auth services
  login: '/api/v1/auth/login',
  register: '/api/v1/auth/register',

  // post services
  getAllPosts: '/api/v1/posts',
  createOnePosts: '/api/v1/posts',
  updateOnePosts: '/api/v1/posts/:postId',
  deleteOnePosts: '/api/v1/posts/:postId',
}

export default Rest
