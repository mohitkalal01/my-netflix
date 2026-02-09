import { useContext, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom"; // Import useLocation
import AuthContext from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext"; // Import useProfile

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-black">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-red"></div>
  </div>
);

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useContext(AuthContext);
  const { selectedProfile } = useProfile(); // Get selectedProfile
  const location = useLocation(); // Get current location

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but no profile is selected, redirect to profile selector
  // unless the current path is already /profiles to prevent infinite redirects
  if (!selectedProfile && location.pathname !== "/profiles") {
    return <Navigate to="/profiles" replace />;
  }

  return <>{children}</>;
};

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return user && user.role === "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};
