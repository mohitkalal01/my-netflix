# Netflix Clone - MERN Stack

This is a production-quality clone of the Netflix streaming service built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It features a complete authentication system, movie browsing, a "My List" feature, and a "Continue Watching" history.

## Features

- **Netflix-style UI:** Modern and responsive user interface built with React and Tailwind CSS.
- **Authentication:** Secure user registration and login system using JWT (JSON Web Tokens) stored in HTTP-Only cookies.
- **Protected Routes:** Certain pages are only accessible to logged-in users.
- **Admin Routes:** Special routes and components are protected for admin users.
- **Movie Browsing:**
    - Featured movie hero banner on the home page.
    - Movies categorized by genre in horizontally scrolling rows.
    - Separate pages for Movies and TV Shows.
- **Movie Details:** Dynamic pages with detailed information for each movie.
- **Video Player:** A dedicated page for watching movie trailers or content.
- **My List:** Users can add or remove movies from a personal list.
- **Continue Watching:** The app keeps track of movies a user has started watching.
- **Loading & UI States:**
    - Professional skeleton loaders for a smoother user experience while data is being fetched.
    - Clear error messages for API or other issues.

## Tech Stack

**Frontend:**
- **React.js (with Vite):** A fast and modern UI library.
- **React Router:** For client-side routing.
- **Tailwind CSS:** For utility-first styling.
- **Axios:** For making HTTP requests to the backend.
- **React Context API:** For global state management (authentication).
- **React Icons:** For UI icons.

**Backend:**
- **Node.js & Express.js:** For building the RESTful API.
- **MongoDB & Mongoose:** As the database and ODM (Object Data Modeling) library.
- **JWT (JSON Web Tokens):** For secure authentication.
- **bcrypt:** For hashing user passwords.
- **cors:** To handle cross-origin requests from the frontend.
- **dotenv:** To manage environment variables.

---

## Installation Guide

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or newer)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running on your local machine, OR a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for a cloud-hosted database.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-directory>
```

### 2. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the `backend` directory and add the following variables.

    ```env
    # Server Configuration
    PORT=5000

    # MongoDB Connection
    # Choose one option below and comment out the other

    # Option 1: Local MongoDB (default)
    MONGO_URI=mongodb://127.0.0.1:27017/netflix

    # Option 2: MongoDB Atlas (replace with your connection string)
    # MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

    # JWT Configuration
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRES_IN=30d
    ```
    **Important:** Replace `your_super_secret_jwt_key` with a long, random, and secret string.

4.  **Run the backend server:**
    ```bash
    npm run dev
    ```
    The server should now be running on `http://localhost:5000`.

### 3. Frontend Setup

1.  **Open a new terminal** and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The React application should now be running on `http://localhost:3000`.

### 4. Usage

-   Open your browser and go to `http://localhost:3000`.
-   You will be prompted to **Sign Up** for a new account or **Sign In** if you already have one.
-   Once logged in, you can browse movies, add them to your list, and watch them.

### Populating the Database

To add movies to your database, you can use a tool like Postman or the MongoDB Shell to insert documents into the `movies` collection. Here is an example document structure:

```json
{
  "title": "Example Movie",
  "description": "This is a great movie.",
  "posterUrl": "https://image.tmdb.org/t/p/original/...",
  "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "genre": "Action",
  "duration": "1h 59m",
  "year": "2024",
  "isSeries": false
}
```