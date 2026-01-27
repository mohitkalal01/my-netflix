# My-netflix

This is a full-stack Netflix clone application built with the MERN stack.

## Features

-   **User Authentication**: Users can register and log in to their accounts.
-   **Browse Movies**: A comprehensive list of movies to browse.
-   **Movie Details**: View details for each movie.
-   **My List**: Users can add movies to their personal list.
-   **Watch Movies**: A player to watch movie trailers or content.
-   **User Profile**: A dedicated profile page for each user.

## Tech Stack

### Frontend

-   **Framework**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Chakra UI](https://chakra-ui.com/)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)

### Backend

-   **Framework**: [Node.js](https://nodejs.js.org/) with [Express](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/)
-   **Password Hashing**: [bcrypt](https://www.npmjs.com/package/bcrypt)
-   **File Storage**: [Cloudinary](https://cloudinary.com/)
-   **File Uploads**: [Multer](https://www.npmjs.com/package/multer)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) installed on your machine.
-   [MongoDB](https://www.mongodb.com/try/download/community) installed and running, or a MongoDB Atlas cluster.
-   A [Cloudinary](https://cloudinary.com/) account for image storage.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/mohitkalal01/My-netflix.git
    cd My-netflix
    ```

2.  **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

### Configuration

1.  **Backend Environment Variables:**
    Create a `.env` file in the `backend` directory and add the following variables:

    ```env
    MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
    JWT_SECRET=<YOUR_JWT_SECRET>
    CLOUDINARY_URL=<YOUR_CLOUDINARY_URL>
    ```

2.  **Frontend Environment Variables:**
    The `frontend` directory has a `.env` file with the following variable. Ensure it points to your backend server.

    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

### Running the Application

1.  **Start the backend server:**
    ```sh
    cd backend
    npm run dev
    ```
    The backend server will start on `http://localhost:5000`.

2.  **Start the frontend development server:**
    ```sh
    cd frontend
    npm run dev
    ```
    The frontend will be available at the address provided by Vite (usually `http://localhost:5173`).

## License

Distributed under the MIT License. See `LICENSE` for more information.