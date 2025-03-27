import jwt from "jsonwebtoken"

export const verifyTokens = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ error: "You are not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ error: "Token is not valid" });
        }
        req.userId = payload.id; // Make sure this matches your token payload
        req.isAdmin = payload.isAdmin; // If using admin privileges
        next();
    });
};