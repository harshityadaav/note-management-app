import "./App.css";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Update from "./components/Update";
import Read from "./components/Read";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoute({ children }) {
  const token = Cookies.get("token");
  return token ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/create"
            element={
              <PrivateRoute>
                <Create />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/noteslist"
            element={
              <PrivateRoute>
                <Read />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/update/:id"
            element={
              <PrivateRoute>
                <Update />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
