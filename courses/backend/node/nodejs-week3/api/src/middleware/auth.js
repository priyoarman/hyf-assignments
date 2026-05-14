import jwt from "jsonwebtoken";
import db from "../../../database.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "default_jwt_secret_for_dev";

if (!process.env.JWT_SECRET) {
  console.warn(
    "JWT_SECRET is not set. Using a default development secret. Set JWT_SECRET in production.",
  );
}

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role ?? "user",
    };
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.warn("JWT token expired:", err.message);
      return res.status(401).json({ error: "Token expired" });
    }
    console.warn("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.warn(
        `Forbidden request for user ${req.user.email} with role ${req.user.role}`,
      );
      return res.status(403).json({ error: "Access forbidden" });
    }

    return next();
  };
}

export async function authToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const tokenString = authHeader.slice(7).trim();
  if (!tokenString) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const tokenRecord = await db("tokens")
      .where({ token: tokenString })
      .first();
    if (!tokenRecord) {
      return res.status(401).json({ error: "Invalid authentication token" });
    }

    if (tokenRecord.expires_at) {
      const expiry = new Date(tokenRecord.expires_at);
      if (Number.isNaN(expiry.getTime()) || expiry < new Date()) {
        await db("tokens").where({ id: tokenRecord.id }).del();
        return res.status(401).json({ error: "Authentication token expired" });
      }
    }

    const user = await db("users").where({ id: tokenRecord.user_id }).first();
    if (!user) {
      return res.status(401).json({ error: "Invalid authentication token" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || "user",
    };
    req.authToken = tokenString;
    return next();
  } catch (err) {
    console.error("Token authentication failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
