import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuthContext from "./context/AuthContext";
import {
  ProtectedRoute,
  AdminRoute,
} from "./components/auth/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import { Spinner } from "./components/Loader";

// Page imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Watch from "./pages/Watch";
import TvShows from "./pages/TvShows";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import ProfileSelector from "./pages/ProfileSelector"; // Import ProfileSelector


const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-brand-black">
        <Spinner />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PageWrapper><Home /></PageWrapper>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tv-shows"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PageWrapper><TvShows /></PageWrapper>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PageWrapper><Movies /></PageWrapper>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout>
              <PageWrapper><SearchResults /></PageWrapper>
            </MainLayout>
          }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute>
              <PageWrapper><ProfileSelector /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PageWrapper><Profile /></PageWrapper>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/watch/:id"
          element={
            <ProtectedRoute>
              <PageWrapper><Watch /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <PageWrapper><Admin /></PageWrapper>
            </AdminRoute>
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <PageWrapper><Login /></PageWrapper>}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <PageWrapper><Register /></PageWrapper>}
        />
      </Routes>
    </AnimatePresence>
  );
}


