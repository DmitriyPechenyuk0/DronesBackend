import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import {env} from "../config/env";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
    
        if (!authHeader) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
    
        const token = authHeader.replace("Bearer ", "");
        const payload = verify(token, env.JWT_SECRET) as { userId: number };
        res.locals.userId = payload.userId;
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    next();
}