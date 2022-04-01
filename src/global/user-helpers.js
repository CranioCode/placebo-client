const getUser = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/user/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export { getUser };
