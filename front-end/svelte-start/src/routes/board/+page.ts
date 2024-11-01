// since there's no dynamic data here, we can prerender

import { apiFetch } from "$lib/api";

// it so that it gets served as a static asset in production
export const prerender = true;

export async function load({ params }: { params: any }) {
  // const res = await apiFetch(`/api/posts`);

  const res = await apiFetch(`/post`, {
    method: "GET",
  });

  return {
    res,
  };
}
