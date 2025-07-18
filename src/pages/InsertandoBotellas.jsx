import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/insertando.css";

const InsertandoBotellas = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const containerId = location.state?.containerId || "";
  const containerName = location.state?.containerName || "Contenedor desconocido";

  const [bottlesInserted, setBottlesInserted] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(8);
  const [showCountdown, setShowCountdown] = useState(false);
  const [step, setStep] = useState("conectando"); //conectando → reconocido → abriendo → contando

  useEffect(() => {
    if (!containerId || !containerName) {
      console.error("Datos del contenedor faltantes.");
      setStep("error");
      return;
    }

    // Paso 1: Mostrar "Conectando..."
    setStep("conectando");

    const timeoutReconocido = setTimeout(() => {
      // Paso 2: Mostrar "Contenedor reconocido"
      setStep("reconocido");

      const timeoutAbriendo = setTimeout(() => {
        // Paso 3: Mostrar "Abriendo compartimiento"
        setStep("abriendo");

        // Llamar aquí al hardware para abrir el compartimiento real
        console.log("🟢 Señal enviada para abrir compuerta");

        iniciarConteo(); // Paso 4: Iniciar conteo
      }, 1500);

      return () => clearTimeout(timeoutAbriendo);
    }, 1500);

    return () => clearTimeout(timeoutReconocido);
  }, [containerId, containerName]);

  const iniciarConteo = () => {
    setStep("contando");
    let seconds = 8;

    const interval = setInterval(() => {
      seconds -= 1;
      if (seconds >= 0) setSecondsLeft(seconds);
      if (seconds <= 0) {
        clearInterval(interval);

        //Aquí se cierra el compartimiento (hardware real)
        console.log("Señal enviada para cerrar compuerta");

        //Se envía info actualizada al componente de inicio
        const updatedData = {
          name: containerName,
          bottles: bottlesInserted,
        };

        navigate("/", { state: { updatedData } });
      }
    }, 1000);
  };

  useEffect(() => {
    if (secondsLeft <= 5 && secondsLeft > 0) {
      setShowCountdown(true);
    }
  }, [secondsLeft]);

  return (
    <div className="insertando-wrapper">
      <h2 className="insertando-titulo-verde">Insertando Botellas</h2>

      {step === "error" && (
        <p className="insertando-mensaje-error">
          Error: No se encontraron datos del contenedor.
        </p>
      )}

      {step === "conectando" && (
        <div className="insertando-mensaje-sistema">
          <div className="icono-cargando" />
          <p>Conectando al contenedor...</p>
        </div>
      )}

      {step === "reconocido" && (
        <div className="insertando-mensaje-reconocido animacion-fadein">
          <div className="icono-check" />
          <p>Contenedor reconocido:</p>
          <h3>{containerName}</h3>
        </div>
      )}

      {step === "abriendo" && (
        <div className="insertando-mensaje-sistema">
          <div className="icono-puerta" />
          <p>Abriendo compartimiento...</p>
        </div>
      )}

      {(step === "contando" || step === "abriendo") && (
        <>
          <div className="insertando-botella-icono">
            <svg width="100" height="100" viewBox="0 0 64 64" fill="#00c853" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 2v6h16V2H24zm20 8H20v10c0 4-4 10-4 14v26c0 2 2 4 4 4h24c2 0 4-2 4-4V34c0-4-4-10-4-14V10z"/>
            </svg>
          </div>
          <p className="insertando-contador-botellas">
            Botellas detectadas: <strong>{bottlesInserted}</strong>
          </p>
        </>
      )}

      {showCountdown && secondsLeft > 0 && (
        <div className="insertando-countdown-animado">
          <p className="insertando-mensaje-cierre">Cerrando compartimiento en...</p>
          <div className="insertando-numero-pulse">{secondsLeft}</div>
        </div>
      )}

      <p className="insertando-mensaje-pequeno">
        *Estos valores seran actualizados en los datos del usuario.
      </p>
    </div>
  );
};

export default InsertandoBotellas;
