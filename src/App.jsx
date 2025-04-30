import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashboardUtama.jsx";
import Login from "./pages/Loginpage.jsx";
import Result from "./pages/ResultPage.jsx";
import Resume from "./pages/ResumeBuilderPage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import Upload from "./pages/UploadCVPage.jsx";
import History from "./pages/CVHistoryPage.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/Loginpage" element={<Login />} />
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/result" element={<Result />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;