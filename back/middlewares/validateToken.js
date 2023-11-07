const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token)
    return res.status(401).send({ message: "No token, Autorizacion denegada" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(400).send({ message: "Token Invalido" });

    req.user = user;
  });
  next();
};

module.exports = { authRequired };
