```markdown
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

**EcoPoint** es una aplicación web progresiva (PWA) diseñada para ejecutarse en dispositivos móviles al escanear un código QR presente en un contenedor físico (EcoBox). La app permite registrar el reciclaje de botellas, asignar puntos virtuales (EcoPoints) y canjearlos por logros o premios.

Esta plataforma busca motivar a las personas a **reciclar de forma lúdica**, integrando recompensas digitales con acciones físicas reales.

---

## ✨ Características principales

- Autenticación con correo, Google o Facebook
- Registro y seguimiento de EcoPoints
- Pantalla de escaneo QR para conectar con EcoBoxes
- Sistema de logros y niveles
- Catálogo de premios y tienda
- Interfaz adaptativa y moderna (UI/UX mobile-first)

---

## 🧱 Stack tecnológico

| Tecnología      | Uso principal                  |
|----------------|--------------------------------|
| React + Vite   | Frontend rápido y modular      |
| Firebase       | Auth, Firestore, Hosting       |
| React Router   | Navegación SPA                 |
| CSS Modules    | Estilos limpios y escalables   |
| GitHub         | Versionado y colaboración      |

---

## 🗂️ Estructura del proyecto

```

ecopoint-app/
├── public/
├── src/
│   ├── assets/           → Imágenes y logos
│   ├── pages/            → Login, Home, Registro, etc.
│   ├── components/       → Navegación, botones, etc.
│   ├── services/         → Configuración de Firebase
│   └── App.jsx
├── .env                  → Variables privadas (no subir)
├── README.md
└── package.json

````

---

## 🚀 Cómo levantar el proyecto localmente

```bash
git clone https://github.com/Diego-Fernando-Vasquez-Torres/ecopoint-app.git
cd ecopoint-app
npm install
npm run dev
````

Abre el navegador en:

```
http://localhost:5173
```

---

## 👥 Equipo de desarrollo

* **Diego Vásquez** – *Frontend, UI/UX y Coordinación*
* \[Agregar aquí otros miembros]

---

## 🧪 Estado actual del desarrollo

* [x] Login/Registro conectado a Firebase
* [x] Interfaz responsive pensada para móviles
* [x] Home con barra de navegación
* [ ] Escaneo QR (en progreso)
* [ ] Logros y tienda de recompensas

---

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).

---

## 💬 Contacto

¿Ideas, sugerencias o feedback?
Puedes abrir un issue o escribirnos al equipo directamente.

---

<p align="center">
  <strong>🌱 EcoPoint – Reciclar nunca fue tan divertido.</strong><br/>
  <em>Creando conciencia ecológica, un escaneo a la vez.</em>
</p>
```

---