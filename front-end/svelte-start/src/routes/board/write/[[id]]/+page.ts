// since there's no dynamic data here, we can prerender

import { apiFetch } from "$lib/api";

// it so that it gets served as a static asset in production
export const prerender = true;

export async function load({ params }: { params: any }) {
  if (params.id) {
    const { id } = params;
    const board = await apiFetch(`/api/posts/${id}`);
    return { detail: { id: board._id, ...board } };
  } else {
    return { detail: { id: null } };
  }
}
