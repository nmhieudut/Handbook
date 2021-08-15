import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignInAction } from 'store/auth/action'
import { Form, Input, Button } from 'antd'
import { RootState } from 'store/reducers'
import firebase from 'firebase'
import { StyledFirebaseAuth } from 'react-firebaseui'
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  signInSuccessUrl: '/home',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};
export default function Login() {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.auth.isLoading)
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUser
  )
  const error = useSelector((state: RootState) => state.auth.error)
  const onFinish = (values: any) => {
    console.log('Success:', values)
    dispatch(SignInAction(values))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  console.log('-----', loggedInUser, error)
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center border-2 p-12">
        <h3>LOGIN</h3>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          {error && <p className="text-red-600 text-center">Failed: {error}</p>}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <span>OR</span>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </div>
  )
}
