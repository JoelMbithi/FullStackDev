import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token || req.headers.authorization?.split(" ")[1];

    console.log("Received Token:", token); // Debugging

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            console.log("JWT Error:", error.message); // Debugging
            return next(createError(403, "Token is not valid!"));
        }

        req.user = user;  // Attach user info to request object
        console.log("Decoded User:", req.user); // Debugging
        next(); // Proceed to next middleware
    });
};

// Middleware to verify user permissions (for deleting/updating user)
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, (error) => {
        if (error) return next(error);
        
        console.log("User verification:", req.user);
        
        if (req.user?.id === req.params.id || req.user?.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

// Middleware to verify admin privileges
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("Admin verification:", req.user);
        
        if (req.user?.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};
