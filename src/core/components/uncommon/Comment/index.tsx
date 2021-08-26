import { Avatar } from 'antd'
import { formatDistanceToNow } from 'date-fns'

const Comment = ({
  comment: {
    commentor: { avatar, displayName },
    text,
    createdAt,
  },
}: any) => {
  return (
    <div className="flex justify-start overflow-y-hidden my-4 flex-basis-1">
      {avatar ? (
        <Avatar src={avatar} />
      ) : (
        <Avatar>{displayName?.charAt(0)}</Avatar>
      )}
      <div className="ml-4 flex-1">
        <div className="px-4 py-2 rounded-3xl comment inline-block">
          <b>{displayName}</b>
          <p>{text}</p>
        </div>
        <span className="ml-4 mt-2 opacity-70 text-xs block">
          {formatDistanceToNow(new Date(createdAt))}
        </span>
      </div>
    </div>
  )
}

export default Comment
