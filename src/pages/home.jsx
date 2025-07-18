// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/home.css";

import {
  FaLeaf,
  FaRecycle,
  FaStore,
  FaGift,
  FaTrophy,
  FaUser,
  FaQrcode,
  FaBell,
} from "react-icons/fa";

import { motion } from "framer-motion";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días ☀️";
  if (hour < 18) return "Buenas tardes 🌤️";
  return "Buenas noches 🌙";
}

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      try {
        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          setUserData({
            nombre: user.displayName || "Usuario",
            nivel: 1,
            puntos: 0,
            progreso: 0,
          });
        }
      } catch (err) {
        console.error("Error obteniendo datos del usuario:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, db, navigate]);

  if (loading) return <Loader message="Reciclar también es progreso 🌱" />;

  return (
    <div className="home-container">
      {/* Encabezado */}
      <header className="home-header">
        <div className="header-left">
          <p className="greeting">{getGreeting()},</p>
          <h2 className="username">{userData.nombre}</h2>
          <div className="level-badge">
            <FaLeaf className="level-icon" />
            Nivel {userData.nivel}
          </div>
        </div>
        <FaBell className="bell-icon" />
      </header>

      {/* Tarjeta de puntos */}
      <motion.section
        className="points-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="card-title">Tus EcoPoints</h2>
        <div className="points-value">{userData.puntos}</div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${userData.progreso}%` }}
          ></div>
        </div>
        <p className="progress-info">
          {userData.progreso}% hacia el siguiente nivel
        </p>
      </motion.section>

      {/* Botón escanear QR */}
      <motion.section
        className="scan-section"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/QR" style={{ textDecoration: "none" }}>
          <button className="scan-button pulse">
            <FaQrcode className="scan-icon" />
            Escanear EcoBox
          </button>
        </Link>
      </motion.section>

      {/* Acciones rápidas */}
      <motion.section
        className="quick-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="section-title">Acciones rápidas</h3>
        <div className="actions-grid">
          <button className="action-button">
            <FaStore />
            <span>Tienda</span>
          </button>
          <button className="action-button">
            <FaTrophy />
            <span>Logros</span>
          </button>
          <button className="action-button">
            <FaGift />
            <span>Premios</span>
          </button>
          <button className="action-button">
            <FaRecycle />
            <span>Historial</span>
          </button>
        </div>
      </motion.section>

      {/* Navegación inferior */}
      <motion.nav
        className="bottom-nav"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <a href="/home" className="nav-item active">
          <FaLeaf />
          <span>Inicio</span>
        </a>
        <a href="/reciclar" className="nav-item">
          <FaRecycle />
          <span>Reciclar</span>
        </a>
        <a href="/tienda" className="nav-item">
          <FaStore />
          <span>Tienda</span>
        </a>
        <a href="/logros" className="nav-item">
          <FaTrophy />
          <span>Logros</span>
        </a>
        <a href="/perfil" className="nav-item">
          <FaUser />
          <span>Perfil</span>
        </a>
      </motion.nav>
    </div>
  );
}
