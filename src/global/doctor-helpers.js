const fetchAllDoctors = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/doctor`);
  return await res.json();
};

const getDoctor = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/doctor/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export { fetchAllDoctors, getDoctor };
