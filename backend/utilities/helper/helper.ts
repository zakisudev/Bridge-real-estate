import bcryptjs from "bcryptjs";

/**
 * Hashes a password using bcryptjs.
 * @param password - The password to be hashed.
 * @returns A Promise that resolves to the hashed password.
 */
export const hashPassword = (password: any): any => {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcryptjs
      .hash(password, saltRounds)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};
