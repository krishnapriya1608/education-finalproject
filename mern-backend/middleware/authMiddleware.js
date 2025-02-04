const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin=require('../models/Admin')

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    // If token is missing or empty
    if (!token) {
        return res.status(401).json({ message: 'Token is required for authentication' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.Acti_secret);
        console.log('Decoded Token:', decoded);  // Log for debugging (remove in production)

        // Find user in the database
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user data to the request object
        req.user = user;

        // Ensure role is valid or fallback to default role
        req.user.role = (decoded.role || 'defaultRole').trim();  // Trim any extra whitespace

        next();
    } catch (err) {
        console.error('JWT Error:', err);  // Log error for debugging purposes
        res.status(401).json({ message: 'Token is not valid', error: err.message });
    }
};


const authorizeRole = (teacher) => (req, res, next) => {
    console.log('User role:', req.user.role);  // Log user role for debugging (remove in production)

    // Check if the user's role matches the required role
    if (req.user.role !== teacher) {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();  // Role is authorized, proceed with the next middleware or route
};

// Middleware to ensure user is admin or superadmin


module.exports = { authenticateToken, authorizeRole };
