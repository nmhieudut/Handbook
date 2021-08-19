import { Avatar, Button, Card, Divider } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useState } from 'react'
const { Meta } = Card

function CreateCard({
  loading,
  user: { avatar, displayName },
  onCreatePost,
}: any) {
  const [text, setText] = useState('')
  const onChange = ({ target: { value } }) => {
    setText(value)
  }
  const handleCreatePost = () => {
    onCreatePost(text)
  }
  return (
    <div className="w-full my-4">
      <Card className="w-full">
        <h2>Post something</h2>
        <Divider plain/>
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
