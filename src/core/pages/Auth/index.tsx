import { Divider, Form, Input, Tabs } from 'antd'
import { Loader } from 'core/components/common/Loader'
import firebase from 'firebase'
import { useState } from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { useDispatch, useSelector } from 'react-redux'
import { SignInAction, SignUpAction } from 'store/auth/action'
import { RootState } from 'store/reducers'
const { TabPane } = Tabs

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

export default function Auth() {
  const dispatch = useDispatch()
  const [isSignIn, setIsSignIn] = useState(true)
  const loading = useSelector((state: RootState) => state.auth.isLoading)

  const signInError = useSelector((state: RootState) => state.auth.signInError)
  const signUpError = useSelector((state: RootState) => state.auth.signUpError)
  const onTabChange = (key) => {
    setIsSignIn(key === '1' ? true : false)
  }
  const onFinish = (values: any) => {
    if (isSignIn) return dispatch(SignInAction(values))
    return dispatch(SignUpAction(values))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="border-2 rounded-2xl py-8">
        <Tabs defaultActiveKey="1" centered type="card" onChange={onTabChange}>
          <TabPane tab="Login" key="1">
            <div className="flex flex-col justify-center items-center px-8">
              <Form
                className="w-80"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                    {
                      max: 10,
                      message: 'Your user name should be at most 10',
                    },
                    {
                      min: 6,
                      message: 'Your user name should be at least 6',
                    },
                  ]}
                >
                  <Input
                    className="rounded-xl py-4 px-8 my-2"
                    placeholder="User name"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password
                    className="rounded-xl py-4 px-8 my-2"
                    placeholder="Password"
                  />
                </Form.Item>
                {signInError && (
                  <p className="text-red-600 text-center">
                    Failed: {signInError}
                  </p>
                )}
                <Form.Item className="text-center">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full rounded-xl py-4 px-8 my-2"
                    style={{
                      backgroundColor: '#03dac5',
                    }}
                  >
                    <span>Submit</span>
                  </button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="Register" key="2">
            <div className="flex flex-col justify-center items-center px-8">
              <Form
                className="w-80"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="displayName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your display name!',
                    },
                    {
                      max: 16,
                      message: 'Your display name should be at most 12',
                    },
                    {
                      min: 6,
                      message: 'Your display name should be at least 6',
                    },
                  ]}
                >
                  <Input
                    placeholder="Display name"
                    className="rounded-xl py-4 px-8 my-2"
                  />
                </Form.Item>
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                    {
                      max: 10,
                      message: 'Your user name should be at most 10',
                    },
                    {
                      min: 6,
                      message: 'Your user name should be at least 6',
                    },
                  ]}
                >
                  <Input
                    placeholder="Username"
                    className="rounded-xl py-4 px-8 my-2"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    className="rounded-xl py-4 px-8 my-2"
                  />
                </Form.Item>
                {signUpError && (
                  <p className="text-red-600 text-center">
                    Failed: {signUpError}
                  </p>
                )}
                <Form.Item className="text-center">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full rounded-xl py-4 px-8 my-2"
                    style={{
                      backgroundColor: '#03dac5',
                    }}
                  >
                    {loading ? (
                      <span>
                        <Loader />
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
        </Tabs>
        <div className="flex flex-col items-center">
          <Divider>OR</Divider>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    </div>
  )
}
