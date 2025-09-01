import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/useStore";

function App() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  return (
    <>
      <Routes>
        {/* Default route "/" will redirect to /signin if not token*/}
        <Route
          path="/"
          element={
            user && token ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/signin"
          element={user && token ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={user && token ? <Navigate to="/dashboard" /> : <SignUp />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
