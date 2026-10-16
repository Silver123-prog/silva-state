const jwt = require('jsonwebtoken');

const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET || 'secretkey123', (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid or expired token" });

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: `Access denied. Role '${user.role}' unauthorized.` });
      }

      req.user = user;
      next();
    });
  };
};

module.exports = { verifyRole };