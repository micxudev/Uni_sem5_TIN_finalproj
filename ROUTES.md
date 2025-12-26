# API Routes

Base URL: `/api`

---

## Auth

**Base path:** `/api/auth`

| Method | Endpoint                    |
|--------|-----------------------------|
| POST   | `/api/auth/register`        |
| POST   | `/api/auth/login`           |
| POST   | `/api/auth/logout`          |
| POST   | `/api/auth/change-password` |

---

## Skins

**Base path:** `/api/skins`

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | `/api/skins`     | Get paginated skins |
| GET    | `/api/skins/:id` | Get skin by ID      |
| POST   | `/api/skins`     | Create skin         |
| PUT    | `/api/skins/:id` | Update skin         |
| DELETE | `/api/skins/:id` | Delete skin         |

---

## Users

**Base path:** `/api/users`

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | `/api/users`     | Get paginated users |
| GET    | `/api/users/:id` | Get user by ID      |

---

## Lootboxes

**Base path:** `/api/lootboxes`

| Method | Endpoint              | Description  |
|--------|-----------------------|--------------|
| GET    | `/api/lootboxes/open` | Open lootbox |

---

## Skin Ownerships

**Base path:** `/api`

| Method | Endpoint                             | Description               |
|--------|--------------------------------------|---------------------------|
| GET    | `/api/users/:userId/skin-ownerships` | Get skins owned by a user |
| POST   | `/api/skin-ownerships`               | Grant skin to user        |

---

## Notes

- All routes are prefixed with `/api`
- Pagination applies where noted
- Authentication may be required for protected routes
