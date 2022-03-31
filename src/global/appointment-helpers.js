const createAppointment = async (id, data) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/appointment/new/${id}`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return await res.json();
};

export { createAppointment };
