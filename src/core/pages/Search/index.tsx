import { Avatar, Card, Skeleton } from 'antd'
import PostCard from 'core/components/uncommon/Post/Card'
import useQuery from 'hooks/useQuery'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  CommentPostAction,
  DeletePostAction,
  LikePostAction,
  SearchPostsAction,
  UpdatePostAction,
} from 'store/post/action'
import { RootState } from 'store/reducers'

interface Props {}
const { Meta } = Card
const Search = (props: Props) => {
  const history = useHistory()
  const query = useQuery()
  const searchQuery = query.get('q')
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.loggedInUser)
  const posts = useSelector((state: RootState) => state.post.posts)
  const isFetching = useSelector((state: RootState) => state.post.isFetching)

  useEffect(() => {
    dispatch(SearchPostsAction(searchQuery, () => {}))
  }, [searchQuery])

  const onSave = (editedText, id, cb) => {
    dispatch(UpdatePostAction(editedText, id, cb))
  }

  const onDelete = (id, cb) => {
    dispatch(DeletePostAction(id, cb))
  }

  const onLike = (id, cb) => {
    if (user) {
      return dispatch(LikePostAction(id, cb))
    }
    return history.push('/auth')
  }

  const onComment = (id, content, cb) => {
    if (user) {
      return dispatch(CommentPostAction(id, content, cb))
    }
    return history.push('/auth')
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/2 py-6">
        {!isFetching ? (
          <>
            <h2>
              Results for: <b>{searchQuery}</b>
            </h2>
            {posts.map((post, i) => (
              <PostCard
                onSave={onSave}
                onDelete={onDelete}
                onLike={onLike}
                onComment={onComment}
                post={post}
                key={i}
              />
            ))}
          </>
        ) : (
          <Card className="w-full my-4">
            <Skeleton loading={true} avatar active>
              <Meta avatar={<Avatar src="" />} title="" description="" />
            </Skeleton>
          </Card>
        )}
        {!isFetching && posts?.length === 0 && (
          <div className="flex h-screen items-center justify-center">
            No posts now.
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
