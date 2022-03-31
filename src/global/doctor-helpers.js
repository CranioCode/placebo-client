const fetchAllDoctors = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/doctor`);
  return await res.json();
};

export { fetchAllDoctors };
