import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
