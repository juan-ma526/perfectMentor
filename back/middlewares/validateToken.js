const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).send({ message: "No token, Autorizacion denegada" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err || !user || !user.id) return res.status(401).send({ message: "Token Invalido" });

    req.user = user;
    next();
  });
};

module.exports = { authRequired };
