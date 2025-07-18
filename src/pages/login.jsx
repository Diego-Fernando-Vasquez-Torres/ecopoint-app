// src/pages/Login.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider, db } from '../firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import logo from '../assets/logo.png';
import '../styles/Auth.css';
import Loader from '../components/Loader';

export default function Login() {
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return setError('Ingresa un correo válido');
    setStep(2);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError('Correo o contraseña inválidos');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          nombre: user.displayName || '',
          email: user.email || '',
          creado: new Date().toISOString(),
          rol: 'usuario',
          ecopoints: 0,
          nivel: 1,
          botellasRecicladas: 0,
          canjesRealizados: 0,
          proceso: 'nuevo',
          ecoboxHistorial: [],
        });
      }

      navigate('/home');
    } catch (err) {
      setError('Error al iniciar con Google');
      console.error('Google login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader message="Verificando tus credenciales..." />
  ) : (
    <div className="login-wrapper">
      <div className="login-box">
        <img src={logo} alt="EcoPoint logo" className="logo" />
        <h1 className="title">Bienvenido a EcoPoint</h1>
        <p className="subtitle">Cambia botellas por recompensas. ¡Empieza ahora!</p>

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="form">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn primary">Continuar</button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="form">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? 'Ocultar' : 'Mostrar'}
            </span>
            <button type="submit" className="btn primary">Iniciar sesión</button>
          </form>
        )}

        <div className="divider">o</div>

        <button className="btn google" onClick={handleGoogleLogin}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="google-icon-img"
          />
          Iniciar sesión con Google
        </button>

        <p className="register">
          ¿Eres nuevo? <a href="/register">Crea una cuenta</a>
        </p>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

