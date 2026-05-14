import jwt from "jsonwebtoken";

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
    };
    return next();
  } catch (err) {
    console.warn("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Invalid authentication token" });
  }
}
