import axiosClient from 'core/api'
import Rest from 'core/api/List'

const Login = async (username: string, password: string) => {
  const userPayload = {
    username,
    password,
  }
  return await axiosClient.post(Rest.login, userPayload)
}

export { Login }
