const jwt = require('jsonwebtoken');

const jwtAuth = {
    checkToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    },

    checkRole: (allowedRoles) => {
        return (req, res, next) => {
            const decoded = req.user;

            // Ensure a role exists and is valid
            if (!decoded.role || !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }

            next();
        };
    }
};

module.exports = jwtAuth;
