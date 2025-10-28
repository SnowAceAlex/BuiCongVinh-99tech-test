# Resource Management API

A RESTful API built with Express.js and TypeScript for managing resources with full CRUD operations.

## Configuration

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:
Here i'm using Neon + postgresql
Just copy and paste the database url Neon give you into DATABASE_URL

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
PORT=3000
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed sample data
npx prisma db seed
```

## Run Application

### Development Mode

```bash
npm start
```

Server runs on `http://localhost:3000` (or your configured PORT)

### Production Mode

```bash
npx tsc
node dist/index.js
```

## API Endpoints

Base URL: `http://localhost:3000/api/resources`

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| POST   | `/api/resources`     | Create a resource             |
| GET    | `/api/resources`     | List resources (with filters) |
| GET    | `/api/resources/:id` | Get resource by ID            |
| PUT    | `/api/resources/:id` | Update resource               |
| DELETE | `/api/resources/:id` | Delete resource               |

## Test Cases for Postman

### 1. Create Resource (POST)

- **Method:** POST
- **URL:** `http://localhost:3000/api/resources`
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Test Resource",
    "description": "This is a test resource"
  }
  ```
- **Expected:** Status `201 Created`, returns created resource with ID

---

### 2. List All Resources (GET)

- **Method:** GET
- **URL:** `http://localhost:3000/api/resources`
- **Expected:** Status `200 OK`, returns array of all resources

---

### 3. Filter by Name (GET with Query)

- **Method:** GET
- **URL:** `http://localhost:3000/api/resources?name=Test`
- **Expected:** Status `200 OK`, returns filtered resources

---

### 4. Pagination (GET with Query)

- **Method:** GET
- **URL:** `http://localhost:3000/api/resources?skip=0&take=5`
  - `skip=0`: Start from beginning
  - `take=5`: Return 5 items
- **Expected:** Status `200 OK`, returns paginated results

---

### 4.5. Filter by Name + Pagination (Combined)

- **Method:** GET
- **URL:** `http://localhost:3000/api/resources?name=Test&skip=0&take=3`
  - `name=Test`: Filter resources by name (case-insensitive)
  - `skip=0`: Skip first 0 items
  - `take=3`: Return 3 items
- **Expected:** Status `200 OK`, returns filtered and paginated results
- **Example:** Get first 3 resources with "Test" in the name

---

### 5. Get Resource by ID (GET)

- **Method:** GET
- **URL:** `http://localhost:3000/api/resources/1` (replace `1` with actual ID)
- **Expected:** Status `200 OK`, returns single resource
- **Error:** Status `404 Not Found` if resource doesn't exist

---

### 6. Update Resource (PUT)

- **Method:** PUT
- **URL:** `http://localhost:3000/api/resources/1` (replace `1` with actual ID)
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Updated Name",
    "description": "Updated description"
  }
  ```
- **Expected:** Status `200 OK`, returns updated resource

---

### 7. Delete Resource (DELETE)

- **Method:** DELETE
- **URL:** `http://localhost:3000/api/resources/1` (replace `1` with actual ID)
- **Expected:** Status `200 OK`, returns success message:
  ```json
  {
    "message": "Resource deleted successfully"
  }
  ```
- **Error:** Status `404 Not Found` if resource doesn't exist

---

## Complete Testing Flow

Test all endpoints in this order:

1. **POST** `/api/resources` - Create 2-3 test resources (save the IDs)
2. **GET** `/api/resources` - List all resources
3. **GET** `/api/resources?name=Test` - Filter by name
4. **GET** `/api/resources?skip=0&take=2` - Test pagination
5. **GET** `/api/resources?name=Test&skip=0&take=2` - Filter by name + pagination (combined)
6. **GET** `/api/resources/:id` - Get specific resource
7. **PUT** `/api/resources/:id` - Update resource
8. **GET** `/api/resources/:id` - Verify update
9. **DELETE** `/api/resources/:id` - Delete resource
10. **GET** `/api/resources/:id` - Verify deletion (should return 404)

## Request/Response Examples

### Create Resource

**Request:**

```json
{
  "name": "My Resource",
  "description": "Optional description"
}
```

**Response (201):**

```json
{
  "id": 1,
  "name": "My Resource",
  "description": "Optional description",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### List Resources

**Response (200):**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Resource 1",
      "description": "Description 1",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 10,
  "skip": 0,
  "take": 10
}
```

### Delete Resource

**Response (200):**

```json
{
  "message": "Resource deleted successfully"
}
```

### Error Response

```json
{
  "error": "Resource not found"
}
```

## Common Issues

- **Connection Refused:** Make sure server is running (`npm start`)
- **404 Not Found:** Verify resource ID exists
- **400 Bad Request:** Check JSON syntax and required fields (`name` is required for POST)
- **500 Error:** Check database connection in `.env` file

## Project Structure

```
Problem 5 - A Crude Server/
├── src/
│   ├── controllers/
│   │   └── resourceController.ts   # CRUD operations
│   ├── routes/
│   │   └── resourceRoutes.ts       # Route definitions
│   ├── generated/
│   │   └── prisma/                 # Generated Prisma Client
│   └── index.ts                    # Application entry point
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── seed.ts                     # Database seeding script
├── .env                            # Environment variables
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
├── nodemon.json                    # Nodemon configuration
└── README.md                       # This file
```
