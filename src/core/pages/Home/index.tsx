import { Avatar, Card, Divider, Skeleton } from 'antd'
import PostCard from 'core/components/uncommon/PostCard'
import CreateCard from 'core/components/uncommon/PostCard/CreateCard'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CreatePostAction,
  DeletePostAction,
  FetchPostsAction,
  LikePostAction,
  UpdatePostAction,
  CommentPostAction
} from 'store/post/action'
import { RootState } from 'store/reducers'
import { useHistory } from 'react-router-dom'

const { Meta } = Card

function Home() {
  const history = useHistory()
  const user = useSelector((state: RootState) => state.auth.loggedInUser)
  const posts = useSelector((state: RootState) => state.post.posts)
  const isFetching = useSelector((state: RootState) => state.post.isFetching)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(FetchPostsAction())
  }, [dispatch])

  const onCreate = (content, cb) => {
    dispatch(CreatePostAction(content, cb))
  }

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
    return history.push("/auth")
  }

  const onComment = (id, content, cb) => {
    if (user) {
      return dispatch(CommentPostAction(id, content, cb))
    }
    return history.push("/auth")
  }

  console.log('user: ', user)
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/2 py-6">
        {user && <CreateCard user={user} onCreatePost={onCreate} />}
        <Divider plain />
        <h2>Recently posts</h2>
        {!isFetching ? (
          posts.map((post, i) => (
            <PostCard
              onSave={onSave}
              onDelete={onDelete}
              onLike={onLike}
              onComment={onComment}
              post={post}
              key={i}
            />
          ))
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

export default Home
