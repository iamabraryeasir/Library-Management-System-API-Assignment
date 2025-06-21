# 📚 Dummy Library Management API

## 📝 About

This is a basic assignment project for the `Programming Hero Level 2 Batch 5`.  
By using this API one can:

- 📖 Create, read, update, and delete books.
- 📖 Borrow books with automatic stock & availability updates.
- 📖 Get aggregated borrowing summary per book.
- 🔐 No authentication yet — just raw endpoints.

---

## 🌐 Live API

🚀 Deployed on Vercel —  
**[https://library-management-system-api-umber.vercel.app/api](https://library-management-system-api-umber.vercel.app/api)**

---

## 🧰 Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Input validation**: Zod
- **Deployment**: Vercel
- **Development tools**: Postman, MongoDB Compass
- **Language**: TypeScript

---

## 📂 API Docs

There are 2 main endpoint groups:

1. 📖 **Books**
2. 📖 **Borrow Records**

---

### 📖 Book Endpoints

---

#### ➕ Create Book

`POST /api/books`

**Request Body Example:**

```json
{
  "title": "The Art of Modern War",
  "author": "Sun Tzu",
  "genre": "HISTORY",
  "isbn": "9781509302249",
  "description": "An ancient Chinese text on strategy and warfare.",
  "copies": 40,
  "available": false
}
```

**Response Example:**

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "title": "The Art of Modern War",
    "author": "Sun Tzu",
    "genre": "HISTORY",
    "isbn": "9781509302249",
    "description": "An ancient Chinese text on strategy and warfare.",
    "copies": 40,
    "available": false,
    "_id": "6856736e6069b06cb54cf11d",
    "createdAt": "2025-06-21T08:55:10.686Z",
    "updatedAt": "2025-06-21T08:55:10.686Z"
  }
}
```

---

#### 📜 Get All Books

`GET /api/books`

**Query params supported:**

- `filter`: Filter by genre
- `sort`: `asc` or `desc`
- `limit`: Number of results

**Example Query:** `/api/books?filter=SCIENCE&sort=desc&limit=5`

**Example Response**

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "68544b9e3fd247f77578a3e9",
      "title": "The Selfish Gene",
      "author": "Richard Dawkins",
      "genre": "SCIENCE",
      "isbn": "9780199291151",
      "description": "An evolutionary biology classic on natural selection and genetics.",
      "copies": 6,
      "available": true,
      "createdAt": "2025-06-19T17:40:46.028Z",
      "updatedAt": "2025-06-19T17:40:46.028Z"
    },
    {...}
  ]
}
```

---

#### 📖 Get Book by ID

`GET /api/books/:bookId`

**Sample Request:** `/api/books/68544b8a3fd247f77578a3e5`

**Sample Response**

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "68544b8a3fd247f77578a3e5",
    "title": "1984",
    "author": "George Orwell",
    "genre": "FICTION",
    "isbn": "9780451524935",
    "description": "A dystopian novel about surveillance and government control.",
    "copies": 6,
    "available": true,
    "createdAt": "2025-06-19T17:40:26.047Z",
    "updatedAt": "2025-06-21T07:21:14.133Z"
  }
}
```

---

#### ✏️ Update Book

`PUT /api/books/:bookId`

**Sample Request:** `/api/books/68544b8a3fd247f77578a3e5`

**Sample Request Body**

```json
{
  "copies": 10
}
```

**Sample Response**

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "68544b8a3fd247f77578a3e5",
    "title": "1984",
    "author": "George Orwell",
    "genre": "FICTION",
    "isbn": "9780451524935",
    "description": "A dystopian novel about surveillance and government control.",
    "copies": 10,
    "available": true,
    "createdAt": "2025-06-19T17:40:26.047Z",
    "updatedAt": "2025-06-21T10:35:47.764Z"
  }
}
```

---

#### 🗑️ Delete Book

`DELETE /api/books/:bookId`

**Sample Request:** `/api/books/68544b8a3fd247f77578a3e5`

**Sample Response**

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

---

### 📖 Borrow Endpoints

#### 📖 Borrow a Book

`POST /api/borrow`

**Business Logic:**

- Validate request body with **Zod**.
- Check `available` copies.
- Deduct requested quantity.
- Set `available` to `false` if copies = 0 using instance method.
- Save borrow record.

**Sample Request Body**

```json
{
  "book": "68544b8a3fd247f77578a3e5",
  "quantity": 2,
  "dueDate": "2025-07-01T00:00:00.000Z"
}
```

**Sample Response**

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "book": "68544b8a3fd247f77578a3e5",
    "quantity": 2,
    "dueDate": "2025-07-01T00:00:00.000Z",
    "_id": "68565d6a12fee4cfabf1a865",
    "createdAt": "2025-06-21T07:21:14.068Z",
    "updatedAt": "2025-06-21T07:21:14.068Z"
  }
}
```

---

#### 📊 Borrowed Books Summary

`GET /api/borrow`

**Uses MongoDB Aggregation:**

- Groups by `book`.
- Sums `quantity`.
- Projects `title` and `isbn`.

**Sample Response**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "totalQuantity": 2,
      "book": {
        "title": "The Hobbit",
        "isbn": "9780547928227"
      }
    },
    {
      "totalQuantity": 5,
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      }
    }
  ]
}
```

---

## 🏃‍♂️ Run Locally

Run the following command to get the code locally.

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
npm install
```

Then Create a .env file and add this 3 lines in the env file.

```text
PORT=3001
MONGODB_URI= # your db url
MONGODB_NAME=library-management-api
```

Now run the following command.

```
npm run dev
```
