<h1 align="center">
  ♻️ EcoPoint
</h1>
<p align="center">
  <strong>Recompensas por Reciclar.</strong><br />
  Una aplicación moderna que conecta a los usuarios con contenedores inteligentes para incentivar el reciclaje con EcoPoints.
</p>

<div align="center">
  <img src="https://img.shields.io/github/license/Diego-Fernando-Vasquez-Torres/ecopoint-app?style=flat-square" />
  <img src="https://img.shields.io/badge/status-en%20desarrollo-yellow?style=flat-square" />
</div>

---

## 🌍 Descripción general

**EcoPoint** es una aplicación web progresiva (PWA) diseñada para ejecutarse en dispositivos móviles mediante el escaneo de un código QR colocado en un contenedor físico inteligente (EcoBox).

La app permite registrar el reciclaje de botellas y otorga puntos virtuales (EcoPoints), los cuales pueden ser canjeados por premios o logros dentro de la plataforma.

Nuestro objetivo es **motivar a las personas a reciclar** a través de una experiencia interactiva, educativa y gamificada.

---

## ✨ Características principales

- ✅ Autenticación con Google (Firebase)
- ✅ Detección de contenedores inteligentes mediante escaneo QR
- ✅ Verificación en Firestore si el contenedor existe
- ✅ Animaciones secuenciales de conexión y apertura del compartimiento
- ✅ Conteo de botellas simuladas (interfaz lista para conectar con hardware)
- ✅ Almacenamiento del nombre del contenedor y cantidad de botellas
- ✅ Navegación fluida entre vistas móviles (React Router)
- ✅ Estilo limpio, moderno y responsivo (UI/UX centrado en móviles)

---

## 🧱 Stack tecnológico

| Tecnología      | Uso principal                      |
|----------------|------------------------------------|
| React + Vite   | Frontend rápido y modular          |
| Firebase       | Autenticación, Firestore, Hosting  |
| React Router   | Navegación SPA                     |
| CSS Modules    | Estilos escalables por componente  |
| GitHub         | Control de versiones y colaboración|

---

## 📦 Funcionalidades ya integradas

### 🔐 Autenticación Firebase
- Inicio de sesión con Google.
- Gestión de sesión persistente.
- Almacenamiento de usuarios en Firestore.

### 📲 Conexión con EcoBox
- Escaneo de QR → obtención de ID del contenedor.
- Verificación en Firestore si el contenedor existe.
- Transición de estados: `Conectando → Reconocido → Abriendo compartimiento`.

### 🧴 Registro de botellas
- Conteo simulado de botellas insertadas (para pruebas de frontend).
- Integración pensada para futura conexión con el hardware del contenedor.
- Actualización visual y lógica del contador y cierre del ciclo.

---

## 🗂️ Estructura del proyecto

ecopoint-app/
├── public/ → Archivos estáticos e íconos
├── src/
│ ├── assets/ → Imágenes, logos y SVGs
│ ├── components/ → Botones, navegación, loader
│ ├── pages/ → Login, Home, InsertandoBotellas, etc.
│ ├── services/ → firebaseConfig.js y lógica de Firestore
│ ├── styles/ → Archivos CSS por componente
│ └── App.jsx → Rutas principales
├── .env → Variables privadas (no subir)
├── README.md
└── package.json

yaml
Copiar
Editar

---

## 🚀 Cómo levantar el proyecto localmente

```bash
git clone https://github.com/Diego-Fernando-Vasquez-Torres/ecopoint-app.git
cd ecopoint-app
npm install
npm run dev
Abre el navegador en:

arduino
Copiar
Editar
http://localhost:5173
🧪 Estado actual del desarrollo
 Login y sesión persistente con Firebase

 Escaneo QR funcional (con verificación en la base de datos)

 Animaciones de conexión e interacción simulada con el contenedor

 Registro de botellas simuladas (pendiente integración física)

 Navegación fluida entre pantallas

 Logros y sistema de recompensas (en desarrollo)

 Tienda y canje de puntos (pendiente)

 Panel de usuario (historial de reciclaje, estadísticas)

🛠️ Notas para conexión con hardware
Para el equipo de hardware:

La pantalla /insertando-botellas ya simula las fases del proceso.

Las funciones están preparadas para:

Reconocer que el contenedor está conectado (basado en su ID en Firestore).

Simular apertura de compuerta (puede integrarse señal GPIO aquí).

Simular conteo de botellas (reemplazar con lectura de sensores).

Esperar un tiempo y cerrar (ideal para eventos físicos de cierre).

Comentarios están agregados en el código para facilitar el enlace entre software y hardware.

👥 Equipo de desarrollo
Diego Vásquez – Frontend, Backend | UI/UX

[Agregar aquí más miembros si corresponde]

📄 Licencia
Este proyecto está bajo la Licencia MIT.

💬 Contacto
¿Tienes ideas, sugerencias o feedback?
Abre un issue en este repositorio o escríbenos directamente.

<p align="center"> <strong>🌱 EcoPoint –.</strong><br/> <em>Conectando personas, tecnología y sostenibilidad.</em> </p> ```