# 🏟️ Redlight Sports Events Platform

This is a sports event management platform built as a **Turborepo** project with a **React (Vite)** frontend and a **NestJS** backend. It serves as a step towards my internship at [redlight.dev](https://redlight.dev/). The platform is designed specifically for **Redlight employees** to create, manage, and participate in sports events, with features like user roles, event registration, and event search.

[Github Repo](https://github.com/iDarkQ/redlight-events-manager)

## Preview of the website:

[![Watch the video](https://raw.githubusercontent.com/iDarkQ/redlight-events-manager/main/docs/preview.png)](https://raw.githubusercontent.com/iDarkQ/redlight-events-manager/main/docs/video.mp4)

---

## 📋 Project Requirements

These were the core functional requirements for this project:

* ✅ Create new sports events (e.g., Football Matches, Ping Pong Tournament)
* ✅ List existing events
* ✅ Show details of an existing event
* ✅ Update an existing event
* ✅ Delete an existing event
* ✅ Search for events
* ✅ Register participants (employees) to events
* ✅ List participants of a given event
* ✅ Mark an event as completed or cancelled
* ✅ User authentication
* ✅ Make the mentioned entities soft deletable

---

## 🚀 Extras (Requested by Redlight)

Additional features I could choose to do (all of the ideas got implemented) beyond the core functionality:

* ✅ Define different user roles:

  * **Admin**: Can create, update, and delete events (including those created by others) and manage participants.
  * **Participant**: Can browse, register for events, create and manage their own events, and view participants.
* ✅ Prevent overbooking of events (limit registrations based on max capacity).
* ✅ Filters for sport type, location, and date.
* ✅ Event image upload functionality.
* ✅ Email notifications for event registration (mock or real).
* ✅ Export events to calendar formats (ICS or Google Calendar).

---

## ✨ My Additional Extras

Here are the additional features I implemented to improve the project beyond the required scope:

* 🎨 Design fully based on [redlight.dev](https://redlight.dev/) — logos, fonts, and visual style match Redlight’s branding.
* 👥 Guest access to events without registration.
* 📅 Automatic event completion based on date.
* 🗺️ 3D map background for events without images.
* 🚫 User banning functionality for admins.
* 🔄 Admin-controlled user role changes.
* 🔒 Default admin determined by `.env` email (cannot be banned or demoted).
* 📋 Participant management page for admins to manage users (ban or change roles).
* 📄 Dedicated "About" page explaining the project and design decisions.
* 📝 Markdown support for event descriptions instead of plain text.
* 📍 Auto-location selection with OpenStreet API (point on map for location picking).

---

## 📦 Project Stack

Here’s the technology stack I used for this project:

* **React**
* **TypeScript**
* **Vite**
* **NestJS**
* **Prisma**
* **PostgreSQL**
* **Turborepo**
* **Prettier**
* **ESLint**
* **Class-Validator**
* **Swagger & OpenAPI**
* **Swagger UI**
* **OpenAPI Generator**
* **Mailersend**

---

## 🛠️ Project Setup Tutorial

### Prerequisites

* **Node.js**
* **Yarn** (or swap to `npm`/`pnpm`)
* **PostgreSQL** (ensure it’s running and reachable)

### Repo Layout

```
/
├─ apps/
│  ├─ frontend/     ← React + Vite
│  └─ backend/      ← NestJS + Prisma
```

---

### 1. Clone & Install

At the root of your Turborepo:

```bash
git clone https://github.com/iDarkQ/redlight-events-manager.git
cd redlight-events-manager-main
yarn install
```

> Yarn workspaces will hoist and install everything in one go.

---

### 2. Environment Variables

Create a `.env` file in each of `apps/backend` and `apps/frontend`. Fill in the values as follows:

---

#### **Backend** (`apps/backend/.env`)

```env
# Database & Auth
DATABASE_URL="postgresql://<user>:<pass>@<host>:5432/<db>?schema=public"
JWT_SECRET="<your_jwt_secret>"
DEFAULT_ADMIN="idarkq.dev@gmail.com"

# Mailersend (email service)
MAILERSEND_SECRET="<your_mailersend_api_key>"
MAILERSEND_SENDER_EMAIL="<sender@example.com>"
MAILERSEND_TEMPLATE_ID="<your_template_id>"

# Frontend URLs (for CORS, redirects, etc.)
LOCAL_FRONTEND_URL="http://localhost:5173"
FRONTEND_URL="https://redlight.dev"

# Debugging
DEBUG=true
```

---

#### **Frontend** (`apps/frontend/.env`)

```env
# Mapbox (or other public APIs)
VITE_MAPBOX_PUBLIC_TOKEN="<your_mapbox_token>"

# Backend endpoints
VITE_LOCAL_BACKEND_URL="http://localhost:8084"
VITE_BACKEND_URL="https://redlight.dev"

# Debug
VITE_DEBUG=true
```

---

### 3. Backend: Prisma & Migrations

1. **Generate the Prisma client** (reflects your schema in code):

   ```bash
   cd apps/backend
   yarn prisma generate
   ```

2. **Run database migrations** (applies any new schema changes):

   ```bash
   yarn prisma migrate dev --name init
   ```

   * Use a descriptive name instead of `init` for subsequent migrations (e.g. `add-users-table`).

3. **(Optional)** If you ever pull new migrations from source control:

   ```bash
   yarn prisma migrate deploy      # applies pending migrations
   yarn prisma generate            # regenerates the client
   ```

---

### 4. Start both frontend and backend

At the root of the project

```bash
yarn dev
```

> NestJS and React will watch your files and restart on changes.

---

## 🎉 You’re All Set!

* ✅ **Backend** running on `http://localhost:8084`
* ✅ **Frontend** running on `http://localhost:5173`

---

### Tips & Troubleshooting

* **CORS errors?** Make sure your backend’s `LOCAL_FRONTEND_URL` matches your actual frontend origin.
* **Prisma client missing?** Always run `yarn prisma generate` after changing `schema.prisma`.
* **Env vars not picked up?** Double‑check you restarted your server after editing the `.env` files.

---

## 🧪 Testing Strategy

### ✅ Backend Tests

* Manual testing of API endpoints via Swagger UI.
* Postman collections for more complex workflows.
* Auth flow tests using JWT tokens.

### ✅ Frontend Tests

* Manual UI testing for all user flows.
* Form validation checks (especially for complex forms).
* API integration testing using OpenAPI-generated types.
* UI responsiveness and visual tests on different screen sizes.

---

## 📂 Project Organization & Structure

* All folders use **kebab-case** for naming consistency.
* Components follow **single responsibility** principle—no component exceeds 500 lines of code.
* Reusable components are modularized and separated logically.
* Commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (e.g., `refactor(scope): message`).
* Backend & frontend are separated cleanly inside Turborepo apps.
* Shared packages (e.g., types, configs) are located in `/packages`.

---

## 🐞 Problems & Solutions

### ✅ Ensuring Admin Access from the Start (Secret OP Role)

One of the first challenges I faced was making sure there would always be at least one admin in the system—someone who could promote users or manage the platform. Initially, I considered creating a "sudo" user whose email would be stored in `.env`. However, this approach had flaws: what if the user wanted to transfer the role but lost access to their account? Or what if you needed to change the email later? I wanted a solution that didn’t require modifying the database manually.

In the end, I introduced a **default admin** mechanism—an email stored in `.env`. This user automatically receives admin privileges on login and cannot be banned or demoted. If the leadership ever needs to change, you simply update the email in `.env`. This solution avoids database edits and keeps admin control easy to manage.

---

### ✅ DTOs vs Entities: Why I Chose DTOs

In NestJS, it’s common to use Prisma objects as entities. However, I preferred a different approach for better maintainability. By using **DTOs (Data Transfer Objects)**, I could leverage NestJS utilities like `OmitType`, `PartialType`, and `PickType` to reuse fields across multiple DTOs while keeping API docs consistent with `@ApiProperty`. This eliminated duplication—especially for validation rules, examples, and documentation—and made the code easier to maintain and extend.

---

### ✅ Why I Switched to OpenAPI Generator

Originally, I stored all DTOs in a shared Turborepo package, allowing me to reuse types across the backend and frontend. However, this broke down with **enums**—specifically, enums from Prisma didn’t align with the shared DTOs’ enums, causing type conflicts.

After exploring solutions, I decided to integrate **OpenAPI Generator**. Now, I generate frontend types directly from my OpenAPI spec, ensuring that types (including enums) always match between frontend and backend. This approach gave me accurate, strongly-typed APIs without having to manually sync types.

---

### ✅ Handling Image Uploads: Why I Avoided Base64

Initially, I considered using **Base64-encoded strings** for image uploads because it seemed simple. However, I quickly realized it’s inefficient and not scalable for larger apps. I also learned about solutions like AWS S3 buckets.

For this project, I opted for a simpler yet scalable method: storing images on the backend’s local storage under `/static/uploads`. The process works like this:

1. User uploads an image → it gets stored in a `tmp` folder.
2. When the event is created, the app validates that the uploaded image exists, then moves it from `tmp` to a permanent folder.
3. Temporary images get automatically cleared every 12 hours.

This system keeps file management simple, avoids bloating the database, and ensures only valid images are saved permanently.

---

### ✅ Improving 3D Map Performance with Loading Screens

To enhance the look of events without images, I implemented a **3D map** background. My first attempt used Google's satellite preview, but the loading time was over 5 seconds—too slow for a smooth UX.

I switched to **Mapbox**, which offered lightweight 3D maps with building outlines and fast loading (around 2.5 seconds). However, even 2.5 seconds can feel sluggish. To solve this, I added a **loading animation** that covers the screen while the map loads. This animation only appears the first time an event is viewed, ensuring a smoother experience without frustrating wait times.

---

### ✅ Creating Custom 3D Camera Animations

While the basic 3D map was functional, I wanted to add a more dynamic touch. I implemented a **smooth orbiting camera** around the event location to make the background feel alive and engaging.

This required learning Mapbox’s camera API and customizing rotations and transitions, but the result is a subtle, looping animation that greatly enhances visual appeal without affecting performance.

---

### ✅ Markdown vs Plain Text for Event Descriptions

Plain text descriptions often feel limiting, especially for events where formatting, links, or emphasis can improve readability. That’s why I chose to use **Markdown** for event descriptions.

Markdown gives users flexibility to style their event info naturally—whether it’s highlighting important details, adding bullet points, or inserting links. It’s simple to use, yet powerful enough to enrich the content.

---

### ✅ Design Approach: Why I Picked Redlight.dev Over UI Libraries

For the design, I initially considered popular component libraries like **Shadcn** or **Ant Design**. However, since this project was specifically tailored for **Redlight Sports Events**, I decided to directly base the design on [Redlight.dev](https://redlight.dev/).

This allowed me to maintain visual consistency with Redlight’s branding and saved me from excessive customization work. Using a prebuilt UI kit would have required overriding many components just to replicate Redlight’s style, so designing from scratch made more sense here.

---

### ✅ Simplified Authorization with JWT

Previously, I handled authentication by building a custom session system, storing tokens in the database and manually managing sessions.

For this project, I decided to simplify things by adopting **JWT (JSON Web Tokens)**. This allowed me to:

* Eliminate the need for a sessions table.
* Easily validate users with token-based auth.
* Improve scalability, since JWTs work well in distributed environments.

It also gave me hands-on experience with a widely-used industry standard for secure token-based authentication.

---

### ✅ Dynamic Sport Types vs Fixed Enums

Initially, I considered defining all sport types in a static **Prisma enum**:

```prisma
enum SportType {
  FOOTBALL
  BASKETBALL
  ...
}
```

However, I realized this approach has major downsides:

* Users can’t create events for less common sports without modifying the schema.
* Filtering becomes bloated with irrelevant sports.

Instead, I implemented **dynamic sport types**:

1. When creating an event, users can either select an existing sport type (from past events) or define a new one.
2. Filters only show sport types that already exist in events, making them context-aware and relevant.
3. No schema updates are needed to add new sports.

While this approach introduces some risks—like duplicate sport types—it can be improved by adding admin approval for new types. Overall, it keeps the platform flexible and user-friendly.

---

## 🎨 Design Inspirations

These websites heavily inspired my design decisions:

* [O-Sports](https://www.o-sports.pt/en/sports-events) — Sports event designs & UX patterns.
* [React Google Maps](https://visgl.github.io/react-google-maps/) — Map-based visualizations.
* [Haikei](https://app.haikei.app/) — For wave backgrounds and creative SVG shapes.
* [Redlight.dev](https://redlight.dev/) — Core branding and design language (primary design reference).
