// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import QR from "./pages/QR";
import InsertandoBotellas from "./pages/InsertandoBotellas";
import Loader from "./components/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader message="Cargando..." />;
  }

  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
      <Route path="/QR" element={user ? <QR /> : <Navigate to="/" />} />
      <Route path="/insertando-botellas" element={user ? <InsertandoBotellas /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
