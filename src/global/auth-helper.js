/**
 *
 * @param {{
 *    email: string;
 *    password: string;
 *    role: "user"|"doctor";
 * }} data
 *
 * @returns {Promise<Response>}
 */
const login = async (data) => {
  const { email, password, role } = data;
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/auth/login/${role}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
  return await res.json();
};

const logout = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export { login, logout };
