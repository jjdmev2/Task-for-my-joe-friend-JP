# Task for my joe friend JP

A simple web application that lets you upload a JSON file, parses (decrypts) its contents on the server, and displays the data as a clean HTML table in the browser.

## Tech Stack

- **Node.js** — Runtime
- **Express** — Web framework
- **Multer** — File upload handling (multipart/form-data)
- **EJS** — Templating engine for server-side rendering

## Features

- Upload `.json` files via drag-and-drop or file picker
- Server-side JSON decryption (parsing)
- Data rendered as an HTML table with row numbers
- Light / Dark mode toggle (persists across pages)
- Clean, modern UI inspired by Linear and Vercel

## How to Run

```bash
npm install
npm start
```

Then open [http://localhost:5050](http://localhost:5050) in your browser.

## Example JSON

Create a file called `test.json`:

```json
[
  { "name": "Juan", "age": 21, "course": "BSIT" },
  { "name": "Maria", "age": 22, "course": "BSCS" },
  { "name": "Pedro", "age": 20, "course": "BSIS" }
]
```

Upload it and you'll see the data displayed in a styled table.

## How It Works (POST Routes Only)

1. **POST `/`** — Renders the upload form
2. **POST `/upload`** — Multer receives the file, the server reads and parses the JSON, then renders the table view with EJS

The app uses POST routes exclusively. When you visit the URL in a browser, a small landing page auto-submits a POST request to load the form.
