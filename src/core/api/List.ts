const Rest = {
  // auth services
  login: '/api/v1/auth/login',
  register: '/api/v1/auth/register',

  // post services
  getAll: '/api/v1/posts',
  createOne: '/api/v1/posts',
  updateOne: '/api/v1/posts/:postId',
  deleteOne: '/api/v1/posts/:postId',
}

export default Rest
