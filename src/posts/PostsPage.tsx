import { PostData } from './types';
import { PostsList } from './PostsList';
import { NewPostForm } from './NewPostForm';
import { savePost } from './savePost';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { assertIsPosts } from './getPosts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function PostsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //React Query’s useMutation hook allows data to be updated
  const { mutate } = useMutation({
    mutationFn: savePost,
    onSuccess: (savedPost) => {
      console.log('Mutation succeeded', savedPost); // Debugging log
      queryClient.setQueryData<PostData[]>(['postsData'], (oldPosts) => {
        if (oldPosts === undefined) {
          return [savedPost];
        } else {
          return [savedPost, ...oldPosts];
        }
      });
      console.log('Navigation triggered'); // Debugging log
      navigate('/posts');
    },
    onError: (error) => {
      console.error('Mutation failed', error); // Debugging log
    },
  });

  const data = useLoaderData();
  assertIsData(data);

  return (
    <div className="w-96 mx-auto mt-6">
      <h2 className="text-xl text-slate-900 font-bold">Posts</h2>
      <NewPostForm onSave={mutate} />
      {/* Suspense and Await work together to only render PostsLists when the data has been fetched */}
      <Suspense fallback={<div>Fetching...</div>}>
        <Await resolve={data.posts}>
          {(posts) => {
            assertIsPosts(posts);
            return <PostsList posts={posts} />;
          }}
        </Await>
      </Suspense>
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
