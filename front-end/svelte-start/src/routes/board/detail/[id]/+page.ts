// since there's no dynamic data here, we can prerender

import { apiFetch } from "$lib/api";

// it so that it gets served as a static asset in production
export const prerender = true;

export async function load({ params }: { params: any }) {
  const { id } = params;
  // const board = await apiFetch(`/api/posts/${id}`);
  const board = await apiFetch(`/graphql`, {
    method: "POST",
    body: JSON.stringify({
      query: `{
  post(id : "${id}"){
    _id,
    title,
    writer,
    password,
    hits,
    content
    comments{
      idx,
      name,
      comment,
      createdDt
    }
  }
}`,
    }),
  });
  return {
    detail: board.data.post,
  };
}
