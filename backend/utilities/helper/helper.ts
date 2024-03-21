import bcryptjs from "bcryptjs";

export const hashPassword = (password: any): any => {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcryptjs
      .hash(password, saltRounds)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};
