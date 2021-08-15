import { Avatar, Card, Skeleton, Typography } from 'antd'
import PostCard from 'core/components/uncommon/PostCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchPostsAction } from 'store/post/action'
import { RootState } from 'store/reducers'
const { Meta } = Card
function Home() {
  const posts = useSelector((state: RootState) => state.post.posts)
  const isFetching = useSelector((state: RootState) => state.post.isFetching)
  const total = useSelector((state: RootState) => state.post.total)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('here')

    dispatch(FetchPostsAction())
  }, [])
  console.log('--', posts)
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-1/2 py-6">
        {!isFetching && posts?.length > 0 ? (
          posts.map((post, i) => <PostCard post={post} key={i} />)
        ) : (
          <Card className="rounded-2xl w-full my-4">
            <Skeleton loading={true} avatar active>
              <Meta avatar={<Avatar src="" />} title="" description="" />
            </Skeleton>
          </Card>
        )}
        {posts?.length === 0 && (
          <div className="flex h-screen items-center justify-center">
            No posts now.
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
