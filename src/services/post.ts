import axiosClient from 'core/api'
import Rest from 'core/api/List'
const fetchPosts = async () => {
  try {
    const res = await axiosClient.get(Rest.getAllPosts)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export { fetchPosts }
