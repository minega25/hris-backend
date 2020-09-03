import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

const roles = ['EMPLOYEE', 'ADMIN'];

const createToken = (user, secret, expiresIn) => {
  const { id, role, verified, username, email } = user;

  return jwt.sign({ id, role, verified, username, email }, secret, {
    expiresIn,
  });
};

const getUserFromToken = (token, User, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch ({ message }) {
    logger.error(message);
  }
};

/**
 *
 *
 * @param {*} next
 * @param {Array} allowedRoles
 */
const authenticate = (next, allowedRoles) => (root, args, context, info) => {
  if (!context.authUser) {
    throw new AuthenticationError('You need to be logged in!');
  }
  if (allowedRoles) {
    const isValidRole = roles.some((role) => allowedRoles.includes(role));
    let isUserAllowed = null;
    let loggedInUserRole = context.authUser.role;
    if (Array.isArray(allowedRoles)) {
      isUserAllowed = allowedRoles.some((role) => role === loggedInUserRole);
    } else {
      isUserAllowed = loggedInUserRole === allowedRoles;
    }

    if (!isValidRole || !isUserAllowed)
      throw new AuthenticationError(
        `You do not have enough permission to perform this action`
      );
  }

  return next(root, args, context, info);
};

const verified = (role, next) => (root, args, context, info) => {
  if (!context.authUser.verified) {
    throw new AuthenticationError(`you must Verify Your Account First`);
  }

  return next(root, args, context, info);
};

module.exports = {
  getUserFromToken,
  authenticate,
  roles,
  createToken,
};
