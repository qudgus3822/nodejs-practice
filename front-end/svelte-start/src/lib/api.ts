const postOption = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const deleteOption = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
};

const putOption = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res = await fetch(`${apiUrl}${url}`, {
    headers: {
      "content-type": "application/json",
    },
    ...options,
  });
  return await res.json();
};
