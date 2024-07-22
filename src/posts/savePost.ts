import { NewPostData, SavedPostData } from './types';

export async function savePost(newPostData: NewPostData) {
  const response = await fetch(process.env.REACT_APP_API_URL!, {
    method: 'POST',
    body: JSON.stringify(newPostData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = (await response.json()) as unknown;
  assertIsSavedPost(body);
  //Merging the blog post ID from the response with the blog post title and description supplied to the function
  return { ...newPostData, ...body };
}

function assertIsSavedPost(post: any): asserts post is SavedPostData {
  if (!('id' in post)) {
    throw new Error("post doesn't contain id");
  }
  if (typeof post.id !== 'string') {
    throw new Error('id is not a string');
  }
}
