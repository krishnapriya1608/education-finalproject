const jwt = require('jsonwebtoken');
const Admin=require('../models/Admin')

const authenticate= (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
  
  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid', error: err.message });
    }

    req.user = decoded; 
    next(); // Proceed to next middleware or route handler
  });
};
const isAdminOrSuperAdmin = (req, res, next) => {
    if (req.user.role !== 'admin' ) {
        console.log('User role:', req.user.role); // Log the user's role for debugging

      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };

module.exports = {authenticate, isAdminOrSuperAdmin};
