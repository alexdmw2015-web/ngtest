# CookBook Backend

Simple backend for the CookBook frontend homework.

## Install

```bash
npm install
```

## Run

```bash
npm start
```

By default server runs on `http://localhost:3001`.

You can set a custom port:

```bash
PORT=3002 npm start
```

## API

### `GET /recipes`
Returns recipe cards:

```json
[
  {
    "id": "1",
    "title": "Pasta Carbonara",
    "category": "Italian",
    "image": "https://example.com/image.jpg",
    "cookTime": 25,
    "isFavorite": false
  }
]
```

### `GET /recipes/:id`
Returns recipe details:

```json
{
  "id": "1",
  "title": "Pasta Carbonara",
  "category": "Italian",
  "image": "https://example.com/image.jpg",
  "cookTime": 25,
  "ingredients": ["Pasta", "Eggs", "Bacon"],
  "instructions": "Cook pasta and mix ingredients..."
}
```

### `PATCH /recipes/:id/favorite`
Updates favorite status.

Body:

```json
{
  "isFavorite": true
}
```

### `POST /recipes/:id/view`
Saves recipe to recently viewed list.

Body is not required.

### `GET /recipes/recently-viewed`
Returns recently viewed recipes:

```json
[
  {
    "id": "3",
    "title": "Chicken Curry",
    "category": "Asian",
    "image": "https://example.com/image.jpg",
    "cookTime": 40
  }
]
```

## Notes

- In-memory storage only (single user).
- Favorite state and recently viewed history are stored on backend while the process is running.
- Data resets when server restarts.
- Recipe images are served locally from `public/images/recipes` via `/images/recipes/<file>.jpg`.
- API responses now include absolute image URLs (default base `http://localhost:3001`). Override with `IMAGE_BASE_URL` if needed.
