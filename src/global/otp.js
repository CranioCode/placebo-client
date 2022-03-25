/**
 * @description Verifies the given otp from `token`
 * @param {string} token
 * @returns {Promise<{
 *    success: boolean;
 *    data: Doctor | User
 * }>}
 */
const verifyOtp = async (token, isDoctor) => {
  const options = {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      token,
    }),
  };

  const url = `/api/v1/auth/${isDoctor ? "doctor" : "user"}/otp/verify`;
  let res = await fetch(url, options);
  return await res.json();
};

/**
 * @description Requests new OTP for the user with given `uid`
 * @param {string} uid
 * @returns {Promise<{
 *    success: boolean;
 *    data: Doctor | User
 * }>}
 */
const requestNewOtp = async (uid, isDoctor) => {
  const url = `/api/v1/auth/${isDoctor ? "doctor" : "user"}/otp/request`;
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      uid,
    }),
  });
  return await res.json();
};

export { verifyOtp, requestNewOtp };
