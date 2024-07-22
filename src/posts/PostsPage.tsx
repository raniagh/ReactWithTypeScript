import { PostData } from './types';
import { PostsList } from './PostsList';
import { NewPostForm } from './NewPostForm';
import { savePost } from './savePost';
import { Await, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import { assertIsPosts, getPosts } from './getPosts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function PostsPage() {
  const {
    isLoading,
    isFetching,
    data: posts,
  } = useQuery({
    queryKey: ['postsData'],
    queryFn: getPosts,
  });
  const queryClient = useQueryClient();
  //React Query’s useMutation hook allows data to be updated
  const { mutate } = useMutation({
    mutationFn: savePost,
    onSuccess: (savedPost) => {
      queryClient.setQueryData<PostData[]>(['postsData'], (oldPosts) => {
        if (oldPosts === undefined) {
          return [savedPost];
        } else {
          return [savedPost, ...oldPosts];
        }
      });
    },
  });
  //const data = useLoaderData();
  //assertIsData(data);

  if (isLoading || posts === undefined) {
    return <div className="w-96 mx-auto mt-6">Loading ...</div>;
  }

  return (
    <div className="w-96 mx-auto mt-6">
      <h2 className="text-xl text-slate-900 font-bold">Posts</h2>
      <NewPostForm onSave={mutate} />
      {/* Suspense and Await work together to only render PostsLists when the data has been fetched */}
      {/*  <Suspense fallback={<div>Fetching...</div>}>
        <Await resolve={data.posts}>
          {(posts) => {
            assertIsPosts(posts);
            return <PostsList posts={posts} />;
          }}
        </Await>
      </Suspense> */}

      {isFetching ? <div>Fetching ...</div> : <PostsList posts={posts} />}
    </div>
  );
}

type Data = {
  posts: PostData[];
};
//The type assertion function checks that the data parameter is an object containing a posts property.
export function assertIsData(data: unknown): asserts data is Data {
  if (typeof data !== 'object') {
    throw new Error("Data isn't an object");
  }
  if (data === null) {
    throw new Error('Data is null');
  }
  if (!('posts' in data)) {
    throw new Error("data doesn't contain posts");
  }
}
