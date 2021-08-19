import { Avatar, Card, Skeleton } from 'antd'
import PostCard from 'core/components/uncommon/PostCard'
import CreateCard from 'core/components/uncommon/PostCard/CreateCard'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CreatePostAction,
  DeletePostAction,
  FetchPostsAction,
  UpdatePostAction,
} from 'store/post/action'
import { RootState } from 'store/reducers'

const { Meta } = Card

function Home() {
  const [reloading, setReloading] = useState(false)

  const user = useSelector((state: RootState) => state.auth.loggedInUser)
  const posts = useSelector((state: RootState) => state.post.posts)
  const isFetching = useSelector((state: RootState) => state.post.isFetching)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(FetchPostsAction())
  }, [dispatch])

  const onCreate = (content) => {
    setReloading(true)
    dispatch(
      CreatePostAction(content, () => {
        setReloading(false)
        dispatch(FetchPostsAction())
      })
    )
  }

  const onSave = (editedText, id) => {
    setReloading(true)
    dispatch(
      UpdatePostAction(editedText, id, () => {
        setReloading(false)
        dispatch(FetchPostsAction())
      })
    )
  }

  const onDelete = (id) => {
    setReloading(true)
    dispatch(
      DeletePostAction(id, () => {
        setReloading(false)
        dispatch(FetchPostsAction())
      })
    )
  }
  console.log('user: ', user)
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/2 py-6">
        {user && (
          <CreateCard loading={reloading} user={user} onCreatePost={onCreate} />
        )}
        <h2>Recently posts:</h2>
        {!isFetching ? (
          posts.map((post, i) => (
            <PostCard
              onSave={onSave}
              onDelete={onDelete}
              isOwner={user?.displayName === post.author.displayName}
              post={post}
              key={i}
            />
          ))
        ) : (
          <Card className="rounded-2xl w-full my-4">
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
