import jwt from "jsonwebtoken";

const authmiddleware = (req, res, next) => {
  try {

    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        success: false,
        message: "Token not provided"
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded.userId;   // important fix

    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

export default authmiddleware;