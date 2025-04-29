import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/SignUpPage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import UploadCVPage from "./pages/UploadCVPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rute publik */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Rute yang membutuhkan autentikasi */}
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeBuilderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadCVPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;