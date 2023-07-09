import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/utilComponents/Login";
import Landing from "./components/Landing";
import Register from "./components/utilComponents/Register";
import Dashboard from "./components/overview/Dashboard";
import CourseDashboard from "./components/course/CourseDashboard";
import EditCourse from "./components/course/EditCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/courses" element={<CourseDashboard />} />
        <Route path="/dashboard/buy/:id" element={<EditCourse />} />
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
