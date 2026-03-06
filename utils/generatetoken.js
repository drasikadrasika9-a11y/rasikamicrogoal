import jwt from "jsonwebtoken";

const generateToken = (id) => {

  const token = jwt.sign(
    { id: id },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  return token;
};

export default generateToken;