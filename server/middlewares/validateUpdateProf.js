/* eslint no-restricted-globals: "off" */
/* eslint max-len: "off" */
/* eslint linebreak-style: "off" */

/**
 * This is a validation for user login
 * @constant
 * 
 * @param {String} message - any error message we provide
 * 
 * @returns {Object}
 */

const signupError = (message) => {
  const err = Error(message);
  err.statusCode = 400;
  return err;
};

/**
 * This is a validation for user signup
 * @constant
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 *
 * @returns {Object} an object containing an error message if validation fails
 *
 * @exports validateSignup
 */


const validateUpdateProf = (req, res, next) => {
  let {
    email, firstname, lastname, telephone,
  } = req.body;
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  email = email && email.toString().trim();
  firstname = firstname && firstname.toString().trim();
  lastname = lastname && lastname.toString().trim();
  telephone = telephone && telephone.toString().replace(/\s+/g, '');

  // if (!email && !password) return next(signupError('Email and Password are required'));

  if (!email) return next(signupError('Email is required'));
  if (!emailRegex.test(email)) return next(signupError('Email is not valid'));
  if (!firstname && !lastname) return next(signupError('firstname and lastname are required'));
  if (!firstname) return next(signupError('firstname is required'));
  if (firstname && firstname.length < 3) return next(signupError('firstname must be minimum of 3 characters'));
  if (firstname && firstname.length > 20) return next(signupError('firstname must be maximum of 20 characters'));

  if (!lastname) return next(signupError('lastname is required'));
  if (lastname && lastname.length < 3) return next(signupError('lastname must be minimum of 3 characters'));
  if (lastname && lastname.length > 20) return next(signupError('lastname must be maximum of 20 characters'));
  if (telephone && isNaN(telephone)) return next(signupError('telephone number should not contain an alphabet'));
  if (telephone && telephone.length > 11) return next(signupError('telephone number should not be greater than 11 characters'));
  if (telephone && telephone.length < 11) return next(signupError('invalid telephone number'));

  return next();
};

export default validateUpdateProf;
