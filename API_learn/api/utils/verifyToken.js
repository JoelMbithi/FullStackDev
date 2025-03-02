import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    let token = req.cookies?.access_token;

    // If token is not in cookies, check Authorization header
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) return next(createError(403, "Token is not valid!"));
        
        req.user = user;  // Attach user info to request object
        next(); // Proceed to next middleware
    });
};
