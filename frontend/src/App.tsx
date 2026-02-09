import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuthContext from "./context/AuthContext";
import {
  ProtectedRoute,
  AdminRoute,
} from "./components/auth/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import { Spinner } from "./components/Loader";
import { ReactNode } from "react";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Admin = lazy(() => import("./pages/Admin"));
const Watch = lazy(() => import("./pages/Watch"));
const TvShows = lazy(() => import("./pages/TvShows"));
const Movies = lazy(() => import("./pages/Movies"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const MyList = lazy(() => import("./pages/MyList"));
const Profile = lazy(() => import("./pages/Profile"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const ProfileSelector = lazy(() => import("./pages/ProfileSelector"));

// Page loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] bg-brand-black">
    <Spinner />
  </div>
);

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
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
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PageWrapper><MovieDetail /></PageWrapper>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-list"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PageWrapper><MyList /></PageWrapper>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <PageWrapper><SearchResults /></PageWrapper>
            </ProtectedRoute>
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
