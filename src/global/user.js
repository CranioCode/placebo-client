/**
 * @typedef {{
 *    uid: string;
 *    name: string;
 *    email: string;
 *    dob: string;
 *    testimonials: any[];
 *    appointments: any[];
 *    profilePic: string;
 *    phoneNumber: string | any[];
 *    address: string;
 *    verified: boolean;
 *    otp: {
 *      value: string;
 *      expiry: number;
 *    };
 * }} User
 */

/**
 * @description Fetches the doctor with uid and returns `Doctor`
 * @param {string} uid
 * @returns {Promise<{
 *    success: boolean;
 *    data: Doctor
 * }>}
 */
const fetchUser = async (uid) => {
  const res = await fetch("/api/v1/user/fetch", {
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

export { fetchUser };
