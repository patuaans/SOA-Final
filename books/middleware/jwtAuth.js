const jwt = require('jsonwebtoken');

const jwtAuth = (allowedRoles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Ensure a role exists and is valid
            if (!decoded.role || !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }

            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    };
};

module.exports = { jwtAuth };
