# API Routes

Base URL: `/api`

---

## Auth

**Base path:** `/api/auth`

| Method | Endpoint                    | Auth Required | Role Required |
|--------|-----------------------------|---------------|---------------|
| POST   | `/api/auth/register`        | No            | GUEST         |
| POST   | `/api/auth/login`           | No            | GUEST         |
| POST   | `/api/auth/logout`          | Yes           | PLAYER        |
| POST   | `/api/auth/change-password` | Yes           | PLAYER        |

---

## Skins

**Base path:** `/api/skins`

| Method | Endpoint         | Description         | Auth Required | Role Required |
|--------|------------------|---------------------|---------------|---------------|
| GET    | `/api/skins`     | Get paginated skins | No            | GUEST         |
| GET    | `/api/skins/:id` | Get skin by ID      | No            | GUEST         |
| POST   | `/api/skins`     | Create skin         | Yes           | ADMIN         |
| PUT    | `/api/skins/:id` | Update skin         | Yes           | ADMIN (own)   |
| DELETE | `/api/skins/:id` | Delete skin         | Yes           | ADMIN (own)   |

---

## Users

**Base path:** `/api/users`

| Method | Endpoint         | Description         | Auth Required | Role Required            |
|--------|------------------|---------------------|---------------|--------------------------|
| GET    | `/api/users`     | Get paginated users | Yes           | ADMIN                    |
| GET    | `/api/users/:id` | Get user by ID      | Yes           | PLAYER (own) ADMIN (any) |

---

## Lootboxes

**Base path:** `/api/lootboxes`

| Method | Endpoint              | Description  | Auth Required | Role Required |
|--------|-----------------------|--------------|---------------|---------------|
| GET    | `/api/lootboxes/open` | Open lootbox | Yes           | PLAYER        |

---

## Skin Ownerships

**Base path:** `/api`

| Method | Endpoint                             | Description                             | Auth Required | Role Required            |
|--------|--------------------------------------|-----------------------------------------|---------------|--------------------------|
| GET    | `/api/users/:userId/skin-ownerships` | Get paginated skin-ownerships by a user | Yes           | PLAYER (own) ADMIN (any) |
| POST   | `/api/skin-ownerships`               | Grant skin to user                      | Yes           | ADMIN                    |

---

### Resource-level Permissions

- **own** → the authenticated user must be the owner/creator of the resource
- **any** → no ownership restriction

---

## Notes

- All routes are prefixed with `/api`
- Pagination applies where noted
- Authentication required where noted
- Role required where noted
