# Authentication Notes

- Implemented JSON Web Token (JWT) authentication.
- The `/login` endpoint is available at `/login` and verifies credentials with `bcrypt.compare`.
- A JWT is signed with `JWT_SECRET` and returned on successful login.
- The `requireAuth` middleware verifies the Bearer token and sets `req.user`.
- Example protected route: `/me` returns the authenticated user profile.

Seeded user:
- email: `admin@example.com`
- password: `Password123!`

> For production, set `JWT_SECRET` as an environment variable instead of using the default development secret.
