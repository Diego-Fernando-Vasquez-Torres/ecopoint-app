// src/pages/Register.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Loader from "../components/Loader";

import "../styles/login.css";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (clave !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, clave);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: nombre,
      });

      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nombre,
        correo,
        rol: "usuario",
        nivel: 1,
        progreso: 0,
        foto: "",
      });

      setSuccess("Cuenta creada con éxito");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("Error al crear la cuenta. Intenta con otro correo.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader message="Creando tu cuenta..." />
  ) : (
    <div className="login-wrapper">
      <div className="login-box">
        <img src={logo} alt="EcoPoint logo" className="logo" />
        <h1 className="title">Regístrate</h1>
        <p className="subtitle">Crea tu cuenta y empieza a canjear</p>

        <form onSubmit={handleRegister} className="form">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />
          <button type="submit" className="btn primary">Crear cuenta</button>
        </form>

        <p className="register">
          ¿Ya tienes una cuenta? <a href="/">Inicia sesión</a>
        </p>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
}
