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
  return await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/login/${role}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export { login };
