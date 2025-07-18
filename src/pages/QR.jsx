import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "../styles/qr.css";

const QR = () => {
  const qrCodeRegionId = "reader";
  const html5QrCodeRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startScanner = async () => {
      const config = { fps: 10, qrbox: { width: 220, height: 220 } };

      try {
        const cameras = await Html5Qrcode.getCameras();
        if (!cameras || cameras.length === 0) {
          setError("No se encontró ninguna cámara.");
          return;
        }

        html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            console.log("QR detectado:", decodedText);

            try {
              const parsed = JSON.parse(decodedText);

              if (!parsed.containerId) {
                throw new Error("QR inválido: falta 'containerId'");
              }

              stopScanner();
              navigate("/insertando-botellas", {
                state: { containerId: parsed.containerId },
              });
            } catch (e) {
              setError("Código QR inválido.");
              console.error("Error al parsear QR:", e);
            }
          },
          () => {} // Silenciar errores de escaneo individuales
        );
      } catch (err) {
        console.error("Error al iniciar escáner:", err);
        setError("No se pudo iniciar la cámara.");
      }
    };

    const stopScanner = async () => {
      if (html5QrCodeRef.current?.isScanning) {
        try {
          await html5QrCodeRef.current.stop();
          await html5QrCodeRef.current.clear();
        } catch (stopError) {
          console.warn("Error al detener el escáner:", stopError);
        }
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, [navigate]);

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
    </div>
  );
};

export default QR;
