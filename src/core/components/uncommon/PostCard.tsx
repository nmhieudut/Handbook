import { useState } from 'react'
import { Card, Avatar, Typography } from 'antd'
import { formatDate } from 'utils/timer'
import { LikeOutlined, CommentOutlined } from '@ant-design/icons'
import { Post } from 'store/post/reducer'
const { Meta } = Card
const { Paragraph } = Typography

function PostCard({
  post: {
    id,
    content,
    author: { id: authorId, displayName, avatar },
    createdAt,
  },
}) {
  const [ellipsis, setEllipsis] = useState(true)
  return (
    <div className="w-full my-4">
      <Card className="w-full" hoverable>
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
        <Paragraph
          className="py-4"
          ellipsis={
            ellipsis
              ? { rows: 2, expandable: true, symbol: 'more' }
              : { rows: 2, expandable: false, symbol: 'less' }
          }
        >
          {content}
        </Paragraph>
        <div className="flex w-full border-t-2">
          <button className="flex flex-1 justify-center items-center p-4 hover:bg-gray-100">
            <LikeOutlined className="mx-4" />
            Like
          </button>
          <button className="flex flex-1 justify-center items-center p-4 hover:bg-gray-100">
            <CommentOutlined className="mx-4" />
            Comment
          </button>
        </div>
      </Card>
    </div>
  )
}

export default PostCard
