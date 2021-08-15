import axiosClient from 'core/api'
import Rest from 'core/api/List'

const Login = async (username: string, password: string) => {
  const userPayload = {
    username,
    password,
  }
  return await axiosClient.post(Rest.login, userPayload)
}
const Register = async (
  displayName: string,
  username: string,
  password: string
) => {
  console.log('hererererere', Rest.register)
  const userPayload = {
    displayName,
    username,
    password,
  }
  return await axiosClient.post(Rest.register, userPayload)
}

export { Login, Register }
