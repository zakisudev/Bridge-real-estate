import jwt from 'jsonwebtoken';

const generateToken = (user: any) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '2d',
  });
};

export default generateToken;
