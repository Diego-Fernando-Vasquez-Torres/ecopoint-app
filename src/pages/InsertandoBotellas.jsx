import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/insertando.css"; // Asegúrate de tener este CSS

const InsertandoBotellas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bottlesInserted, setBottlesInserted] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(8);

  // Obtener el texto escaneado desde el QR
  const decodedText = location.state?.decodedText || "{}";
  let containerData = {};
  try {
    containerData = JSON.parse(decodedText);
  } catch (e) {
    console.error("QR inválido:", e);
  }

  const containerName = containerData.name || "Contenedor desconocido";

  useEffect(() => {
    // ⏱️ Iniciar cuenta regresiva de 8 segundos
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    // 🔁 Al llegar a 0, simular datos y redirigir al Home
    const timeout = setTimeout(() => {
      const updatedData = {
        name: containerName,
        bottles: bottlesInserted, // actualmente simulado (siempre 0)
      };
      navigate("/", { state: { updatedData } });
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, containerName, bottlesInserted]);

  return (
    <div className="insertando-wrapper">
      <h2 className="titulo-verde">Insertando Botellas</h2>
      <p className="mensaje-bonito">
        Conectando al contenedor <strong>{containerName}</strong>...
      </p>

      <div className="botella-icono">🧴</div>
      <p className="contador-botellas">
        Botellas detectadas: <strong>{bottlesInserted}</strong>
      </p>

      {/* 🕒 Mostrar cuenta regresiva solo si faltan 5 segundos o menos */}
      {secondsLeft <= 5 && (
        <p className="contador-regresivo">
          Redirigiendo en <strong>{secondsLeft}</strong> segundos...
        </p>
      )}

      <p className="mensaje-pequeno">
        * Este valor se actualizará automáticamente cuando el contenedor esté conectado.
      </p>
    </div>
  );
};

export default InsertandoBotellas;
