import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  LikeTwoTone,
  MoreOutlined
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Divider,
  Popover
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useState } from 'react'
import { formatDate } from 'utils/timer'
const { Meta } = Card

function PostCard({
  post: {
    id,
    content,
    author: { id: authorId, displayName, avatar },
    createdAt,
  },
  isOwner,
  onLike,
  onSave,
  onDelete,
  onComment,
}: any) {
  const [editable, setEditable] = useState(false)
  const [editedText, setEditedText] = useState(content)
  const onChange = ({ target: { value } }) => {
    setEditedText(value)
  }
  const onCancel = () => {
    setEditable(false)
    setEditedText(content)
  }
  const onSavePost = () => {
    setEditable(false)
    onSave(editedText, id)
  }
  const onDeletePost = () => {
    onDelete(id)
  }
  const overlay = (
    <div className="flex flex-col">
      <span
        className="p-1 flex items-center hover:bg-gray-200 cursor-pointer"
        onClick={() => setEditable(true)}
      >
        <EditOutlined className="mr-4" /> Edit
      </span>
      <span
        className="p-1 flex items-center hover:bg-gray-200 cursor-pointer"
        onClick={onDeletePost}
      >
        <DeleteOutlined className="mr-4" />
        Delete
      </span>
    </div>
  )
  return (
    <div className="w-full my-4">
      <Card className="w-full" hoverable>
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
            title={displayName}
            description={formatDate(createdAt)}
          />
          {isOwner && (
            <Popover
              className="hover:bg-gray-200"
              placement="bottomRight"
              content={overlay}
              trigger="click"
            >
              <MoreOutlined />
            </Popover>
          )}
        </div>
        <div className="my-5">{content}</div>
        <Divider />
        <div className="flex items-center">
          <LikeTwoTone />
          <span className="ml-2 cursor-pointer">3 likes </span>
        </div>
        <Divider plain />
        {editable ? (
          <div>
            <TextArea
              value={editedText}
              onChange={onChange}
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <Divider plain />
            <div>
              <Button type="primary" onClick={onSavePost}>
                Save
              </Button>
              <Divider type="vertical" />
              <Button type="primary" danger onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex w-full">
            <button
              onClick={() => onLike()}
              className="flex flex-1 p-4 justify-center items-center hover:bg-gray-100"
            >
              <LikeOutlined className="mx-4" />
              Like
            </button>
            <button
              //  onClick={() => onLike()}
              className="flex flex-1 p-4 justify-center items-center hover:bg-gray-100"
            >
              <CommentOutlined className="mx-4" />
              Comment
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}

export default PostCard
