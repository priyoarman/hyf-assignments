# Authentication Notes

- Implemented JSON Web Token (JWT) authentication.
- The `/login` endpoint is available at `/login` and verifies credentials with `bcrypt.compare`.
- A JWT is signed with `JWT_SECRET` and returned on successful login.
- The `requireAuth` middleware verifies the Bearer token and sets `req.user`.
- Example protected route: `/me` returns the authenticated user profile.
- Added database-stored token authentication with `/login-token` and `/logout-token`.
- The `authToken` middleware checks the `tokens` table and attaches `req.user`.
- The `requireAuth` middleware validates JWTs and reports missing, invalid, or expired tokens safely.
- Protected routes: `POST /api/snippets` requires a valid token, while `DELETE /api/snippets/:id` requires an admin role.

### Credentials

- Admin: `admin@example.com` / `Password123!` (role: admin)
- User: `user@example.com` / `Password123!` (role: user)

### JWT login

1. Send `POST /login` with JSON body:

```json
{
  "email": "admin@example.com",
  "password": "Password123!"
}
```

2. Receive a JWT in the response under `token`.
3. Send authenticated requests with header:

```
Authorization: Bearer <token>
```

### Database token login

1. Send `POST /login-token` with the same JSON body.
2. Receive a database token in the response.
3. Send authenticated requests with header:

```
Authorization: Bearer <token>
```

### Logout / invalidate

- Call `POST /logout-token` with the same `Authorization` header to invalidate the stored token.
- JWTs are invalidated automatically by expiration; expired JWTs return `401 Token expired`.

### API key protected machine endpoint

- Set `API_KEY` in your environment for machine clients.
- Call `GET /api/metrics` with header:

```
x-api-key: <API_KEY>
```

- The endpoint returns counts for snippets and users.

> Use the API key only for machine-to-machine access. Keep it secret and rotate it when needed.

> Sensitive error details are never returned to clients. Server logs contain only safe messages for debugging.

- email: `admin@example.com`
- password: `Password123!`

> For production, set `JWT_SECRET` as an environment variable instead of using the default development secret.
