const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log({ token });

  // verif the token
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json({ message: err.message });
    }

    req.user = decoded;
    return next();
  });
};
