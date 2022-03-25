/**
 * @typedef {{
 *    uid: string;
 *    name: string;
 *    email: string;
 *    dob: string;
 *    yearOfRegistration: string;
 *    registrationNumber: string;
 *    rating: string;
 *    patients: string;
 *    charge: string;
 *    specializations: string;
 *    qualifications: string;
 *    highlights: string;
 *    testimonials: string;
 *    description: string;
 *    yearOfStartingCareer: string;
 *    appointments: string;
 *    availability: string;
 *    profilePic: string;
 *    signature: string;
 *    phoneNumber: string;
 *    address: string;
 *    verified: string;
 *    doctorVerified: string;
 *    otp: string;
 * }} Doctor
 */

/**
 * @description Fetches the doctor with uid and returns `Doctor`
 * @param {string} uid
 * @returns {Promise<{
 *    success: boolean;
 *    data: Doctor
 * }>}
 */
const fetchDoctor = async (uid) => {
  const res = await fetch("/api/v1/doctor/fetch", {
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

/**
 * @description Fetches all doctors `Doctor[]`
 * @param {string} uid
 * @returns {Promise<{
 *    success: boolean;
 *    data: Doctor[]
 * }>}
 */
const fetchAllDoctors = async () => {
  const res = await fetch("/api/v1/doctor/fetchAll", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return await res.json();
};

/**
 *
 * @param {string} yearOfStartingCareer
 * @returns {number}
 */
const calculateExperience = (yearOfStartingCareer) => {
  if (yearOfStartingCareer) {
    return new Date().getFullYear() - parseInt(yearOfStartingCareer);
  } else {
    return 0;
  }
};

export { fetchDoctor, fetchAllDoctors, calculateExperience };
