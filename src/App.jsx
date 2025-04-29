import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/DashboardUtama.jsx";
import Homepage from "./pages/Homepage.jsx";
import LoginPage from "./pages/Loginpage.jsx";
import Result from "./pages/ResultPage.jsx";
import Resume from "./pages/ResumeBuilderPage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import Upload from "./pages/UploadCVPage.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Loginpage" element={<LoginPage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Result />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;