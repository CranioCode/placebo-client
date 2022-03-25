import { DATE_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "./formUtils";

/**
 * @typedef {Object} Validation
 * @property {boolean} truth - True if validated else false
 * @property {string} error - Error string if not validated
 */

/**
 * @description Returns false if the value is empty, else return true
 * @param {string} value
 *        The value which the function validates
 * @returns {Validation}
 */
const required = (value) => {
  return value.length > 0
    ? {
        truth: true,
        error: "",
      }
    : {
        truth: false,
        error: "The required field cannot be empty",
      };
};

/**
 * @description Returns false if the value doesn't meet the email regex, else return true
 * @param {string} value
 *        The value which the function validates
 * @returns {Validation}
 */
const emailValidation = (value) => {
  if (value.match(EMAIL_REGEX)) {
    return {
      truth: true,
      error: "",
    };
  } else {
    return {
      truth: false,
      error: "Please enter valid email",
    };
  }
};

/**
 * @description Returns false if the value doesn't meet the date regex of YYYY-MM-DD format, else return true
 * @param {string} value
 *        The value which the function validates
 * @returns {Validation}
 */
const dateValidation = (value) => {
  if (value.match(DATE_REGEX)) {
    return {
      truth: true,
      error: "",
    };
  } else {
    return {
      truth: false,
      error: "Please enter correct date format",
    };
  }
};

/**
 * @description Returns false if the value doesn't meet the required registration number format for medicine practitioner, else return true
 * @param {string} value
 *        The value which the function validates
 * @returns {Validation}
 * @todo The required format for validation
 */
const registrationNumberValidation = (value) => {
  return {
    truth: true,
    error: "",
  };
};

/**
 * @description Returns false if the password isn't atleast 6 characters long and contains atleast a number and a special character, else return true
 * @param {string} value
 *        The value which the function validates
 * @returns {Validation}
 */
const passwordValidation = (value) => {
  if (value.match(PASSWORD_REGEX)) {
    return {
      truth: true,
      error: "",
    };
  } else {
    return {
      truth: false,
      error:
        "Password must be atleast 6 characters long and must contain atleast one special character and number",
    };
  }
};

/**
 * @description Returns false if year is not between 1930 and Current Year
 * @param {string} year The year to be validated
 * @returns {Validation}
 */
const yearValidation = (year) => {
  if (parseInt(year) >= 1930 && parseInt(year) <= new Date().getFullYear()) {
    return {
      truth: true,
      error: "",
    };
  } else {
    return {
      truth: false,
      error: `Invalid year`,
    };
  }
};

export {
  required,
  emailValidation,
  dateValidation,
  registrationNumberValidation,
  passwordValidation,
  yearValidation,
};
