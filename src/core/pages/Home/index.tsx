import { Avatar, Card, Skeleton } from 'antd'
import PostCard from 'core/components/uncommon/PostCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeletePostsAction, FetchPostsAction, UpdatePostsAction } from 'store/post/action'
import { RootState } from 'store/reducers'
const { Meta } = Card
function Home() {
  const user = useSelector((state: RootState) => state.auth.loggedInUser)
  const posts = useSelector((state: RootState) => state.post.posts)
  const isFetching = useSelector((state: RootState) => state.post.isFetching)
  // const total = useSelector((state: RootState) => state.post.total)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(FetchPostsAction())
  }, [dispatch])
  const onSave = (editedText, id) => {
    dispatch(UpdatePostsAction(editedText, id))
  }
  const onDelete = (id) => {
    dispatch(DeletePostsAction(id))
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-1/2 py-6">
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
