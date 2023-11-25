import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <AuthContextProvider>
   <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
    </AuthContextProvider>
  );
}

export default App;
