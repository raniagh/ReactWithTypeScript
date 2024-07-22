import { PostData } from './types';

export async function getPosts() {
  //A not null assertion operator is used to inform the TS compiler that the expression before can't be null or undefined
  const response = await fetch(process.env.REACT_APP_API_URL!);

  //fetch return a Response object so we call its method json to get the response body in JSON format
  const body = (await response.json()) as unknown;
  //Strongly typing response data
  assertIsPosts(body);
  return body;
}

/*Type assertion function
The return type annotation is called an assertion signature 
Specifies that the postsData parameter is of the PostData[] type if no error occirs in the function execution.
*/
export function assertIsPosts(postsData: unknown): asserts postsData is PostData[] {
  if (!Array.isArray(postsData)) {
    throw new Error("posts isn't an array");
  }
  if (postsData.length === 0) {
    return;
  }
  postsData.forEach((post) => {
    if (!('id' in post)) {
      throw new Error("post doesn't contain id");
    }

    if (!('title' in post)) {
      throw new Error("post doesn't contain title");
    }
    if (typeof post.title !== 'string') {
      throw new Error('title is not a string');
    }
    if (!('description' in post)) {
      throw new Error("post doesn't contain description");
    }
    if (typeof post.description !== 'string') {
      throw new Error('description is not a string');
    }
  });
}
