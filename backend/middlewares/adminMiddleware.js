/**
 * Middleware to check if user is admin
 */
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    next();
  };
  
  module.exports = { adminMiddleware };
  