import { Avatar, Button, Card, Divider, notification } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useState } from 'react'
const { Meta } = Card

function CreateCard({ user: { avatar, displayName }, onCreatePost }: any) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const onChange = ({ target: { value } }) => {
    setText(value)
  }
  const handleCreatePost = () => {
    setLoading(true)
    onCreatePost(text, (e) => {
      if (e) {
        notification['failed']({
          message: 'Success!',
          description: 'Posted succesfully',
        })
      } else {
        notification['success']({
          message: 'Success!',
          description: 'Posted succesfully',
        })
      }
      setText('')
      setLoading(false)
    })
  }
  return (
    <div className="w-full my-4">
      <Card className="w-full">
        <div className="flex justify-between items-center">
          <Meta
            className="flex items-center"
            avatar={
              avatar ? (
                <Avatar src={avatar} size="large" />
              ) : (
                <Avatar size="large">{displayName?.charAt(0)}</Avatar>
              )
            }
          />
          <TextArea
            value={text}
            onChange={onChange}
            required
            placeholder={`What's on your mind, ${displayName}?`}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <Divider plain />
        <Button
          className="w-full"
          type="primary"
          onClick={handleCreatePost}
          loading={loading}
        >
          Post
        </Button>
      </Card>
    </div>
  )
}

export default CreateCard
