import { writable } from "svelte/store";

export const loginInfo = writable({
  email: "",
  password: "",
  token: "",
});
