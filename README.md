# Netflix Clone

This is a fullstack Netflix clone project built with the MERN stack.

## Project Structure

- `frontend/`: React + Vite + Tailwind CSS
- `backend/`: Node + Express + MongoDB

## Work Done

- **Project Cleanup**: Scanned the entire project and removed unused files and code.
  - Removed unused components, pages, and assets from the frontend.
  - Verified that the backend has no unused files.
- **Production Build**: Created a production-ready build for the frontend.
  - The `frontend/dist` directory contains the optimized and minified production build.
- **Backend Preparation**: Ensured the backend is ready for production.
  - The backend uses a `start` script to run in production.
  - The backend uses environment variables for configuration.

## How to Run in Production

### Frontend

The frontend has been built and is ready to be served. The `frontend/dist` directory contains the static files that can be served by any web server.

### Backend

To run the backend in production, follow these steps:

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install --production
    ```
3.  Create a `.env` file with the following variables:
    ```
    CORS_ORIGIN=<your_frontend_url>
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    JWT_EXPIRES_IN=<your_jwt_expiration>
    ```
4.  Start the server:
    ```bash
    npm start
    ```

The backend will start on port 5000.

## Author

**Mohit Kalal** - [GitHub](https://github.com/mohitkalal01)