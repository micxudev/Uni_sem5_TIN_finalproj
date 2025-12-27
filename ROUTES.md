# API Routes

Base URL: `/api`

---

## Auth

**Base path:** `/api/auth`

| Method | Endpoint                    | Auth Required |
|--------|-----------------------------|---------------|
| POST   | `/api/auth/register`        | No            |
| POST   | `/api/auth/login`           | no            |
| POST   | `/api/auth/logout`          | Yes           |
| POST   | `/api/auth/change-password` | Yes           |

---

## Skins

**Base path:** `/api/skins`

| Method | Endpoint         | Description         | Auth Required |
|--------|------------------|---------------------|---------------|
| GET    | `/api/skins`     | Get paginated skins | No            |
| GET    | `/api/skins/:id` | Get skin by ID      | No            |
| POST   | `/api/skins`     | Create skin         | Yes           |
| PUT    | `/api/skins/:id` | Update skin         | Yes           |
| DELETE | `/api/skins/:id` | Delete skin         | Yes           |

---

## Users

**Base path:** `/api/users`

| Method | Endpoint         | Description         | Auth Required |
|--------|------------------|---------------------|---------------|
| GET    | `/api/users`     | Get paginated users | Yes           |
| GET    | `/api/users/:id` | Get user by ID      | Yes           |

---

## Lootboxes

**Base path:** `/api/lootboxes`

| Method | Endpoint              | Description  | Auth Required |
|--------|-----------------------|--------------|---------------|
| GET    | `/api/lootboxes/open` | Open lootbox | Yes           |

---

## Skin Ownerships

**Base path:** `/api`

| Method | Endpoint                             | Description                             | Auth Required |
|--------|--------------------------------------|-----------------------------------------|---------------|
| GET    | `/api/users/:userId/skin-ownerships` | Get paginated skin-ownerships by a user | Yes           |
| POST   | `/api/skin-ownerships`               | Grant skin to user                      | Yes           |

---

## Notes

- All routes are prefixed with `/api`
- Pagination applies where noted
- Authentication may be required for protected routes
