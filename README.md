# 👗 GenWee — AI Powered Outfit Assistant

<div align="center">

![GenWee Banner](/client/public/images/1.png)

**Plan the perfect outfit for any destination, weather, and occasion — powered by AI.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square&logo=clerk)](https://clerk.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Features](#-features) · [Demo](#-demo) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Team](#-team)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌦️ **Weather-Aware Outfits** | Fetches real-time weather for your destination and tailors outfit suggestions accordingly |
| 🤖 **AI Recommendations** | Google Gemini AI generates search keywords based on weather, occasion, and gender |
| 🛍️ **Amazon Integration** | Pulls live outfit thumbnails directly from Amazon search results |
| 👗 **Virtual Try-On** | Upload your photo and virtually try on any recommended outfit |
| 📍 **Location Autocomplete** | Smart destination search powered by OpenStreetMap Nominatim |
| 🔐 **Authentication** | Secure sign in / sign up via Clerk |
| 📱 **Responsive Design** | Works across desktop and mobile devices |

---

## 🖼️ Demo

<div align="center">

### Landing Page
![Landing Page](/client/public/images/3.png)

### Outfit Generator
![Outfit Generator](/client/public/images/4.png)

### Virtual Try-On
![Virtual Try-On](/client/public/images/5.png)

### Outfit Generator
![Outfit Generator](/client/public/images/2.png)

</div>

> 💡 **Tip:** Replace the above image URLs with actual screenshots of your app for best results.  
> Recommended tool: [Screely](https://screely.com) for beautiful browser mockup screenshots.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — UI framework
- **React Router DOM** — Client-side routing
- **Clerk** — Authentication (Sign In, Sign Up, User management)
- **Axios** — HTTP requests
- **React DatePicker** — Date selection
- **Lucide React + React Icons** — Icon library
- **OpenStreetMap Nominatim** — Free location autocomplete API

### Backend
- **Node.js + Express** — REST API server
- **Google Gemini AI** (`gemini-2.0-flash`) — AI outfit keyword generation
- **OpenWeatherMap API** — Real-time weather data
- **Unwrangle Amazon API** — Outfit product search
- **Fashn / Segmind API** — Virtual try-on image generation

---

## 📁 Project Structure

```
outfit-assistant/
│
├── client/                        # React Frontend
│   ├── public/
│   └── src/
│       ├── assets/                # Logo, images
│       ├── components/
│       │   └── Navbar.jsx         # Fixed navbar with auth
│       ├── pages/
│       │   └── Vacation.jsx       # Main outfit generator page
│       ├── App.jsx                # Landing page + routing
│       └── main.jsx               # Entry point
│
└── server/                        # Express Backend
    ├── APIs/
    │   └── modelapp.js            # /model and /try-on routes
    ├── assets/                    # Sample images for try-on
    └── server.js                  # Express app setup
```

---

## 👥 Team & Responsibilities

This project was built as a group assignment, split into 4 modules:

| Part | Module | Responsibility |
|------|--------|----------------|
| **Part 1** | UI & Landing Page | `App.jsx`, `Navbar.jsx`, Clerk auth, hero section, routing |
| **Part 2** | Outfit Generator | `Vacation.jsx`, gender toggle, location autocomplete, form, weather card, outfit grid |
| **Part 3** | Backend Core API | `server.js`, `/model` route, OpenWeather, Gemini AI, Amazon API |
| **Part 4** | Virtual Try-On | `/try-on` route, image processing, try-on modal UI |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- API keys for: OpenWeatherMap, Google Gemini, Unwrangle, Fashn/Segmind, Clerk

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/outfit-assistant.git
cd outfit-assistant
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
OPENWEATHER_API_KEY=your_openweather_key
GEMINI_KEY=your_gemini_api_key
AMAZON_API_KEY=your_unwrangle_key
MODEL_KEY=your_fashn_or_segmind_key
PORT=4700
```

Start the server:

```bash
npm start
```

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file in `/client`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the dev server:

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 🔑 API Keys — Where to Get Them

| Service | Link | Free Tier |
|---|---|---|
| OpenWeatherMap | [openweathermap.org](https://openweathermap.org/api) | ✅ Yes |
| Google Gemini | [ai.google.dev](https://ai.google.dev/) | ✅ Yes |
| Unwrangle Amazon | [unwrangle.com](https://unwrangle.com) | ✅ Limited |
| Clerk Auth | [clerk.com](https://clerk.com) | ✅ Yes |
| Fashn Try-On | [fashn.ai](https://fashn.ai) | ⚠️ Paid |

---

## 🌊 How It Works

```
User Input (location, occasion, date, gender)
        ↓
OpenWeatherMap API → Real-time weather data
        ↓
Google Gemini AI → Outfit search keywords
        ↓
Amazon Search API → Outfit thumbnails + ASINs
        ↓
Display outfit cards with "View on Amazon" + "Try On" buttons
        ↓
[Optional] Upload your photo → Virtual Try-On API → Result image
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Google Gemini](https://ai.google.dev/) for AI-powered fashion intelligence
- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Clerk](https://clerk.com/) for seamless authentication
- [OpenStreetMap Nominatim](https://nominatim.org/) for free location search
- [Unsplash](https://unsplash.com/) for placeholder imagery

---

<div align="center">

Made with ❤️ by the GenWee Team

</div>