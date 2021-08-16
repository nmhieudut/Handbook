import axiosClient from 'core/api'
import Rest from 'core/api/List'
const fetchPosts = async () => {
  try {
    const res = await axiosClient.get(Rest.posts)
    return res.data
  } catch (err) {
    console.log(err)
  }
}
const updatePost = async (id, content) => {
  try {
    const res = await axiosClient.put(`${Rest.posts}/${id}`, { content })
    return res.data
  } catch (err) {
    console.log(err)
  }
}
const deletePost = async (id) => {
  try {
    const res = await axiosClient.delete(`${Rest.posts}/${id}`)
    console.log('========', res)

    return res
  } catch (err) {
    console.log(err)
  }
}

export { fetchPosts, updatePost, deletePost }
