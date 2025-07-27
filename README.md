
# 🚨 SecureSight - Incident Monitoring Dashboard

SecureSight is a fictional CCTV monitoring software where users can connect up to 3 CCTV feeds. Computer vision models automatically detect suspicious or unauthorized activity (e.g., gun threats, intrusions, etc.), and display these incidents for user review and resolution.

This technical assessment focuses on building the **dashboard frontend** and **backend APIs** for tracking, resolving, and managing incidents.

---

## 🧱 Tech Stack

| Layer        | Tech                     |
| ------------ | ------------------------ |
| Frontend     | Next.js App Router, TailwindCSS, Framer Motion |
| Backend      | Express.js, Prisma ORM   |
| Database     | SQLite (dev), PostgreSQL-ready |
| Auth         | JWT-based API route protection |
| Deployment   | Vercel (frontend), Render (backend) |

---

## 🚀 Features

### ✅ Core Scope

- **Incident Player + List View**  
  Interactive layout with:
  - Realtime incident thumbnails
  - Toggle between resolved and unresolved
  - Smooth UI animations and dynamic player

- **Backend API (Express.js)**  
  - `GET /api/incidents` – List incidents (with `resolved` filter)
  - `PATCH /:id/resolve` – Mark incident as resolved or reopened
  - `GET /api/incidents/getcount` – Returns incident stats for analytics

- **Seed Script**  
  Populates 15+ incidents with types like `Gun`, `Unauthorized Access`, `Trespassing`, across multiple simulated cameras.

---

## 🌟 Extra Features (Implemented)

These go beyond the core scope and showcase deeper planning and execution.

- ✅ **Reopen Resolved Incidents**  
  - Implemented at both frontend & backend level.
  - Toggle between resolved and unresolved views.
  - Backend route: `PATCH /:id/resolve`

- ✅ **JWT-Based Authentication**  
  - Integrated middleware for route protection.
  - Backend routes gated using a stubbed JWT auth flow.
  - Routes:  
    - `GET /assigned` (auth-protected)  
    - `GET /unassigned` (auth-protected)

- ✅ **Incident Assignment System**  
  Admin can assign incidents to users:
  - `POST /assign` – Assign an incident
  - `GET /assigned` – Fetch logged-in user's incidents
  - `GET /unassigned` – Fetch all unassigned incidents

- ✅ **Incident Count Endpoint**  
  Analytics-ready endpoint:
  - `GET /getcount` – Fetches resolved/unresolved counts

---

## 🔐 Auth & Protected Routes

Implemented simple JWT-based auth for protected flows:
- `GET /assigned` → user-specific incidents
- `GET /unassigned` → admin flow
- Token middleware is modular and ready for future extensions.

---

## 🧪 Running Locally

### Backend
```bash
cd backend
npm install
npx prisma db push
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

`.env.example` files are provided for both environments.

---

## 📁 Project Structure

```
backend/
  ├── routes/
  │   └── incident.routes.js
  ├── controllers/
  ├── middleware/
  └── server.js

frontend/
  ├── app/
  ├── components/
  ├── hooks/
  └── utils/
```

---

## ✏️ Technical Highlights

- Built with modern **Next.js App Router** architecture.
- **TailwindCSS + Framer Motion** for sleek animations.
- **RESTful backend** designed with separation of concerns.
- Role-based access and expandable auth system.
- Codebase built to scale with real data sources and models.

---

## 🤔 If I Had More Time...

While most of the extra features were already implemented, here are things I’d expand further:

- 📊 **Admin Dashboard**  
  Full UI for incident-user assignment, status filtering, and role management.

- 📈 **Analytics View**  
  Graphs and camera-wise breakdown using `/getcount` data.

- 🔁 **Live Feed & WebSockets**  
  Real-time updates when a new incident is detected.

- 🔔 **Notification System**  
  Trigger email or in-app alerts on critical incident detection.

- 📦 **Production-Grade Auth**  
  Replace stubbed auth with real user login, signup, and role support.
  Since I am not getting paid domains for frontend and backend token in localstorage system has been used or else accesstoken,refreshtoken,csurf-token system using sameSite cookie settings could have been used for more security

---

## 📮 Submission

🔗 [Technical Assessment Submission](https://instinctive-studio.notion.site/2f94e658b574978b9f846e4745f35a21?pvs=105)

Includes:
- ✅ Public GitHub repository
- ✅ Live deployed links (Vercel + Render)
- ✅ This README with all implementation details

---

## 💬 Final Note

This dashboard is built to feel like a real-world control center: responsive, reactive, and reliable. I'm confident in scaling this further into a full product and look forward to the opportunity to continue building at scale with your team.
