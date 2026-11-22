PizzaHub — Pizza Ordering & Delivery Platform (Client)

PizzaHub is a full-stack pizza ordering platform where customers discover local pizza shops and place orders, vendors manage their menus and incoming orders, and an admin approves menu items and oversees the platform. Vendors can upgrade to a Premium subscription with Stripe to list unlimited items and get featured first.

Live site: https://pizzahub-frontend-alpha.vercel.app
Client repo: https://github.com/ArifBillah792/Pizzahub-frontend
Server repo: https://github.com/ArifBillah792/Pizzahub-backend
✨ Features
Everyone
Home page with an animated hero, featured menu items (Premium vendors first) and info sections
Browse the full menu with search, category filter, location filter and price sorting
Menu item details page with an image gallery and vendor info
Custom 404 page, error page and loading states
Authentication
Email & password sign-up / sign-in with Better Auth
Google sign-in, with the chosen role (customer or vendor) kept for Google sign-ups too
Role-based protected dashboards (customer, vendor, admin); users are redirected to their own dashboard
Profile settings page (name and photo); role and plan cannot be changed by the user
A signed JWT is sent to the Express server on every protected request
Customer
Place an order (date, delivery address, message), with validation and duplicate-order protection
My Orders list with status badges and cancel for pending orders
Order details with an order status timeline
Overview with stats and a chart
Vendor
Add, edit and delete menu items, with ImgBB image upload
Free plan: up to 3 active items · Premium: unlimited items and featured placement
Edited items go back to pending for admin review; show/hide items with an availability switch
Incoming orders: accept or reject
Stripe subscription checkout ($9.99/month), cancel at period end, plan status
Overview with stats and a chart
Admin
Approve, reject, deactivate or delete menu items
View and search all users, filter by role
View all Stripe transactions (read only)
Platform overview with stats and charts
🛠️ Tech Stack & npm Packages
Package	Used for
next (App Router), react	Framework and UI
better-auth, @better-auth/mongo-adapter, mongodb	Authentication, sessions, JWT plugin
tailwindcss + shadcn (Base UI)	Styling and UI components
lucide-react	Icons
sonner	Toast notifications
motion (Framer Motion)	Home page animations
recharts	Dashboard charts
next-themes	Theme provider (Dark Neon theme)
🔐 How the JWT flow works
The user signs in with Better Auth on the Next.js app.
Better Auth's jwt plugin issues a signed token (public keys are exposed at /api/auth/jwks).
Server actions in lib/actions/* call the Express API through lib/api.js, adding Authorization: Bearer <token>.
The Express server verifies the token with jose against the JWKS, loads the user from MongoDB, and checks the role.
🔍 Search, filter & sort

The Browse page sends query parameters to the server:

/menu-items?search=pepperoni&category=Pizza&location=Dhaka&sort=price_asc
search → case-insensitive match on the item name
category, location → exact filters
sort → price_asc or price_desc
⚙️ Environment Variables

Create a .env.local file in the project root:

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=
DB_NAME=
NEXT_PUBLIC_API_URL=http://localhost:5000
IMGBB_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
🚀 Run Locally
bash
git clone https://github.com/ArifBillah792/Pizzahub-frontend.git
cd Pizzahub-frontend
npm install
npm run dev

Open http://localhost:3000. The server must also be running (see the server repo).

💳 Stripe Test Card

Use 4242 4242 4242 4242, any future date, any CVC and any ZIP code.