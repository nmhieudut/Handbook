import { Button, Form, Input, Tabs } from 'antd'
import firebase from 'firebase'
import { useState } from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { useDispatch, useSelector } from 'react-redux'
import { SignInAction, SignUpAction } from 'store/auth/action'
import { RootState } from 'store/reducers'
const { TabPane } = Tabs

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/home',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

export default function Auth() {
  const dispatch = useDispatch()
  const [isSignIn, setIsSignIn] = useState(true)
  const loading = useSelector((state: RootState) => state.auth.isLoading)
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUser
  )
  const signInError = useSelector((state: RootState) => state.auth.signInError)
  const signUpError = useSelector((state: RootState) => state.auth.signUpError)
  const onTabChange = (key) => {
    console.log('-----', key)
    setIsSignIn(key === '1' ? true : false)
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
    if (isSignIn) return dispatch(SignInAction(values))
    return dispatch(SignUpAction(values))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  console.log('-----User', loggedInUser, isSignIn)
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="border-2 rounded-2xl py-8">
        <Tabs defaultActiveKey="1" centered type="card" onChange={onTabChange}>
          <TabPane tab="Login" key="1">
            <div className="flex flex-col justify-center items-center p-8">
              <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                {signInError && (
                  <p className="text-red-600 text-center">Failed: {signInError}</p>
                )}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="Register" key="2">
            <div className="flex flex-col justify-center items-center p-8">
              <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Display name"
                  name="displayName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your display name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                {signUpError && (
                  <p className="text-red-600 text-center">Failed: {signUpError}</p>
                )}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
        </Tabs>
        <div className="flex flex-col items-center">
          <span>OR</span>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    </div>
  )
}
