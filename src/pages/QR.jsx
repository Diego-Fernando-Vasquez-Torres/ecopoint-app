import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "../styles/qr.css";
import Loader from "../components/Loader";

const QR = () => {
  const qrCodeRegionId = "reader";
  const html5QrCodeRef = useRef(null);
  const hasNavigated = useRef(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const stopScanner = async () => {
    const scanner = html5QrCodeRef.current;
    if (scanner) {
      try {
        await scanner.stop();
        await scanner.clear();
        console.log("📷 Cámara detenida correctamente.");
      } catch (err) {
        console.warn("⚠️ Error al detener la cámara:", err);
      }
    }
  };

  const handleSuccessfulScan = async (containerId) => {
  setIsLoading(true);
  try {
    // 1. Primero apagamos la cámara lo más rápido posible
    await stopScanner();

    // 2. Luego consultamos el nombre del contenedor en Firebase
    const docRef = doc(db, "containers", containerId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Contenedor no registrado.");
    }

    const containerName = docSnap.data().name || "Contenedor sin nombre";

    // 3. Esperamos un poco para transición suave (opcional)
    setTimeout(() => {
      navigate("/insertando-botellas", {
        state: { containerId, containerName },
      });
    }, 500); // ya no hace falta 2000ms

  } catch (err) {
    console.error("❌ Error al verificar contenedor:", err);
    setError("El contenedor no está registrado o hubo un error.");
    setIsLoading(false);
    hasNavigated.current = false;
  }
};


  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await stopScanner();
      setTimeout(() => {
        navigate("/home"); // ✅ Redirige al Home con loader
      }, 1500);
    } catch (err) {
      console.error("❌ Error al cancelar escaneo:", err);
      setError("Error al cancelar.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const startScanner = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras();

        if (!isMounted) return;

        if (!cameras || cameras.length === 0) {
          setError("No se encontró ninguna cámara.");
          return;
        }

        setError(null); // Limpiar error si hay cámara

        const scanner = new Html5Qrcode(qrCodeRegionId);
        html5QrCodeRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          async (decodedText) => {
            if (hasNavigated.current) return;
            hasNavigated.current = true;

            console.log("✅ QR detectado:", decodedText);

            try {
              const parsed = JSON.parse(decodedText);
              if (!parsed.containerId) throw new Error("Falta containerId");

              await handleSuccessfulScan(parsed.containerId);
            } catch (e) {
              console.error("❌ Error en el QR:", e);
              setError("Código QR inválido.");
              hasNavigated.current = false;
            }
          },
          (scanError) => {
            console.warn("📛 Error escaneando:", scanError);
          }
        );
      } catch (err) {
        console.error("❌ Error iniciando cámara:", err);
        if (isMounted) setError("No se pudo acceder a la cámara.");
      }
    };

    startScanner();

    return () => {
      isMounted = false;
      stopScanner();
    };
  }, [navigate]);

  if (isLoading) {
    return <Loader message="Procesando..." />;
  }

  return (
    <div className="qr-wrapper">
      <h2 className="titulo-verde">Escanea el código QR del contenedor</h2>
      <p className="mensaje-bonito">Alinea el código dentro del recuadro</p>
      {error && <p className="error-text">{error}</p>}

      <div className="qr-box">
        <div id={qrCodeRegionId} className="qr-reader" />
        <div className="scan-frame" />
        <div className="scan-animation" />
      </div>

      <button className="cancel-button" onClick={handleCancel}>
        Cancelar escaneo
      </button>
    </div>
  );
};

export default QR;
