// Верификация токена
function verifyJwtToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Токен отсутствует" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Текущий токен недействителен" });
    req.user = user;
    next();
  });
}

module.exports = verifyJwtToken;
