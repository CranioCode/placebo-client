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
  try {
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
  } catch (error) {
    return {
      success: false,
      error: "No user found. Please register",
    };
  }
};

const signup = async (data) => {
  const { role } = data;

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/auth/signup/${role}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export { login, signup, logout };
