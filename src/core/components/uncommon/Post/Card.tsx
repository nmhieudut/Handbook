import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Divider, Form, Input, Popover, Spin } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Loader } from 'core/components/common/Loader'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { MdThumbUp } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { RootState } from 'store/reducers'
import Comment from '../Comment'
const { Meta } = Card

function renderLikePeople(likes, youLike) {
  let quantity = ''
  if (likes.length === 1) {
    if (youLike) {
      return 'You'
    }
    return likes[0].displayName
  }
  if (likes.length > 1) {
    if (youLike) {
      quantity = 'You'
    } else {
      quantity = `${likes[0].displayName}`
    }
    return `${quantity} and ${likes.length - 1} others`
  }
}

function PostCard({
  post: {
    id,
    content,
    author: { id: authorId, displayName, avatar },
    createdAt,
    likes,
    comments,
  },
  onLike,
  onSave,
  onDelete,
  onComment,
}: any) {
  const [form] = Form.useForm()
  const [editable, setEditable] = useState(false)
  const [editedText, setEditedText] = useState(content)
  const [loading, setLoading] = useState(false)
  const [liking, setLiking] = useState(false)
  const [commenting, setCommenting] = useState(false)
  const [toggleComment, setToggleComment] = useState(false)
  const user = useSelector((state: RootState) => state.auth.loggedInUser)

  const isOwner = user?.id === authorId
  const youLike = likes.find((l) => l._id === user?.id)

  const onChange = ({ target: { value } }) => {
    setEditedText(value)
  }
  const onCancel = () => {
    setEditable(false)
    setEditedText(content)
  }
  const onSavePost = () => {
    setLoading(true)
    setEditable(false)
    onSave(editedText, id, () => {
      setLoading(false)
    })
  }
  const onDeletePost = () => {
    setLoading(true)
    onDelete(id, () => {
      setLoading(false)
    })
  }

  const handleLike = () => {
    setLiking(true)
    onLike(id, () => setLiking(false))
  }

  const handleComment = (values) => {
    form.resetFields()
    setCommenting(true)
    onComment(id, values.comment, () => {
      setCommenting(false)
    })
  }

  const overlay = (
    <div className="flex flex-col">
      <span
        className="p-1 flex items-center opacity-80 hover:opacity-100 cursor-pointer"
        onClick={() => setEditable(true)}
      >
        <EditOutlined className="mr-4" /> Edit
      </span>
      <span
        className="p-1 flex items-center opacity-80 hover:opacity-100 cursor-pointer"
        onClick={onDeletePost}
      >
        <DeleteOutlined className="mr-4" />
        Delete
      </span>
    </div>
  )
  return (
    <div className="w-full my-4">
      <Spin spinning={loading} delay={500}>
        <Card className="w-full" hoverable>
          <div className="flex justify-between items-center">
            <div>
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
                description={
                  <span className="opacity-70">
                    {formatDistanceToNow(new Date(createdAt))}
                  </span>
                }
              />
            </div>

            {isOwner && (
              <Popover
                placement="bottomRight"
                content={overlay}
                trigger="click"
              >
                <MoreOutlined />
              </Popover>
            )}
          </div>
          <div className="my-5">{content}</div>
          <div className="flex justify-between">
            {likes.length > 0 && (
              <div className="flex items-center">
                <span className="rounded-full w-6 h-6 flex justify-center items-center bg-blue-700 text-white">
                  <MdThumbUp size="0.75rem" color="#fff" />
                </span>
                <span className="ml-2 cursor-pointer">
                  {renderLikePeople(likes, youLike)}
                </span>
              </div>
            )}
            {comments.length > 0 && <span>{comments.length} comments</span>}
          </div>

          <div className="my-4 w-full h-px bg-gray-200" />
          {editable ? (
            <>
              <TextArea
                value={editedText}
                onChange={onChange}
                placeholder="Controlled autosize"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              <Divider />
              <div>
                <Button type="primary" onClick={onSavePost}>
                  Save
                </Button>
                <Divider type="vertical" />
                <Button type="primary" danger onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full">
                <button
                  disabled={liking}
                  onClick={handleLike}
                  className="flex flex-1 py-2 justify-center items-center text-blue opacity-80 hover:opacity-100 hover:bg-gray-300"
                >
                  {youLike ? (
                    <>
                      <MdThumbUp className="mx-4" color="#1565c0" />
                      <div className="text-blue-500">Liked</div>
                    </>
                  ) : (
                    <>
                      <LikeOutlined className="mx-4" />
                      Like
                    </>
                  )}
                </button>
                <button
                  onClick={() => setToggleComment(!toggleComment)}
                  className="flex flex-1 py-2 justify-center items-center opacity-80 hover:opacity-100 hover:bg-gray-300"
                >
                  <CommentOutlined className="mx-4" />
                  Comment
                </button>
              </div>
              <div className="my-4 w-full h-px bg-gray-200" />

              {comments.length > 0 &&
                (toggleComment ? (
                  <>
                    <p
                      className="text-blue-500 my-4 block hover:underline"
                      onClick={(e) => {
                        e.preventDefault()
                        setToggleComment(false)
                      }}
                    >
                      Hide all comments
                    </p>
                    {comments.map((comment, i) => (
                      <Comment key={i} comment={comment} />
                    ))}
                  </>
                ) : (
                  <p
                    className="text-blue-500 my-4 block hover:underline"
                    onClick={(e) => {
                      e.preventDefault()
                      setToggleComment(true)
                    }}
                  >
                    Show all comments
                  </p>
                ))}

              <div className="flex items-start">
                {avatar ? (
                  <Avatar src={avatar} />
                ) : (
                  <Avatar>{displayName?.charAt(0)}</Avatar>
                )}
                <Form
                  form={form}
                  className="flex-1 ml-4"
                  onFinish={handleComment}
                >
                  <Form.Item
                    className="mb-0"
                    name="comment"
                    rules={[
                      { required: true, message: 'Please input your comment!' },
                    ]}
                  >
                    <Input
                      placeholder="Comment..."
                      className="bg-gray-400 w-full rounded-3xl comment-input"
                      suffix={commenting && <Loader />}
                    />
                  </Form.Item>
                </Form>
              </div>
            </>
          )}
        </Card>
      </Spin>
    </div>
  )
}

export default PostCard
