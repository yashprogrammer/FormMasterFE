import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button } from "react-bootstrap";
import AdminPanel from "./components/AdminPanel";
import MachineInfo from "./components/MachineInfo";
import Footer from "./components/Footer";

// Function to extract query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<ProtectedAdminRoute />} />
        <Route path="/" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

// Main Content Component
const MainContent = () => {
  const query = useQuery();
  const machineId = query.get("machineId"); // Extract machineId from query params
  const [inputMachineId, setInputMachineId] = useState("");
  const navigate = useNavigate();

  // Handle machine ID submission
  const handleMachineIdSubmit = () => {
    if (inputMachineId.trim() === "") {
      alert("Machine ID cannot be empty");
    } else {
      // Redirect to the same page with the machineId as a query parameter
      navigate(`/?machineId=${inputMachineId}`);
    }
  };

  // If machineId is not present, prompt user to enter it
  if (!machineId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl mb-4">Enter Machine ID</h2>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full mb-4"
            placeholder="Machine ID"
            value={inputMachineId}
            onChange={(e) => setInputMachineId(e.target.value)}
          />
          <Button
            className="bg-blue-500 text-white w-full"
            onClick={handleMachineIdSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }

  // If machineId is present, render the MachineInfo component
  return (
    <div className="bg-gray-900 min-h-screen px-4 text-center">
      <MachineInfo machineId={machineId} />{" "}
      {/* Pass machineId to MachineInfo */}
      <Footer />
    </div>
  );
};

// Protected Route for Admin Panel
const ProtectedAdminRoute = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handlePasswordSubmit = () => {
    if (password === "CorrectFormIsKey") {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (authenticated) {
    return <AdminPanel />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Enter Admin Password</h2>
        <input
          type="password"
          className="border border-gray-300 p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="bg-blue-500 text-white w-full"
          onClick={handlePasswordSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default App;
