import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { DefaultLayout } from "./components/layout/DefaultLayout";
import { useAuthState } from "@/hooks/Auth/useAuth";

const Login = lazy(() => import("@/pages/Login"));
const Tasks = lazy(() => import("@/pages/Tasks"));
const Projects = lazy(() => import("@/pages/Projects"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthState();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DefaultLayout>Home</DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Tasks />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Projects />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;