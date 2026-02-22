const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    // Log helpful debug info (do not log raw token)
    console.log(`protect: tokenPresent=${Boolean(token)} tokenLength=${token.length} decoded=${JSON.stringify(decoded)}`);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
};

exports.adminOnly = (req, res, next) => {
  // Admin role removed — allow all authenticated users.
  // Keep this middleware for backward compatibility; it no longer enforces admin checks.
  next();
};
