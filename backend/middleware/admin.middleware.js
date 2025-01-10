import jwt from "jsonwebtoken";
import config from "../config.js";

function adminMiddleware(req, res, next) {
    const authHeader = req.header.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ errors: "No token Provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, config.JWT_ADMIN_SECRET)
        req.adminId = decoded.id
        next();
    } catch (error) {
        return res.status(401).json({ errors: "invalid token or expired" });
        console.log("Error verifying token", error);
    }
}

export default adminMiddleware;