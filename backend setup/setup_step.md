FINAL BACKEND FILE ORDER (IMPORTANT)

We will follow THIS EXACT ORDER 👇
(Industry-style + beginner friendly)

1️⃣ config/db.js ✅ (DONE by you)
2️⃣ app.js
3️⃣ server.js
4️⃣ controllers/test.controller.js
5️⃣ routes/test.route.js


**File	Role**
# server.js	🚀 Entry point (start engine)
# app.js	🧠 App configuration
🧩 Role of app.js
app.js is NOT the entry point.
It only:
Creates express app
Adds middleware
Registers routes
Exports app
# db.js	🗄️ Database connection


🧠 FULL FLOW IN ONE VIEW (MEMORIZE THIS)
**Startup:**
server.js → imports → app.js → routes → controller → db.js → connectDB → listen

🚀 APP START FLOW
server.js
 ↓
load app.js
 ↓
load routes
 ↓
load controllers
 ↓
load db.js
 ↓
dotenv.config()
 ↓
connectDB()
 ↓
app.listen()


**Request time:**
app.js → routes → controller
🌍 REQUEST FLOW
Request
 ↓
Middleware
 ↓
app.js (/api)
 ↓
route (/test)
 ↓
controller
 ↓
response




**🚀 BACKEND START FLOW (WHEN NODE STARTS)**
node server.js
     │
     ▼
┌──────────────┐
│  server.js   │  ← Node enters here first
└──────────────┘
     │
     ▼
Loads imports (NOT execute)
     │
     ├── app.js
     │     ├─ express app created
     │     ├─ middleware registered
     │     └─ routes registered
     │
     ├── test.route.js
     │     └─ "/test" route registered
     │
     ├── test.controller.js
     │     └─ controller function defined
     │
     └── db.js
           └─ connectDB function defined
     │
     ▼
dotenv.config()  ← .env loaded
     │
     ▼
connectDB()      ← MongoDB connects
     │
     ▼
app.listen()     ← Server starts 🚀






**REQUEST FLOW (WHEN USER HITS API)**
Example URL:
GET /api/test
**Actual flow:**
Request comes
     │
     ▼
express.json() middleware
     │
     ▼
app.js checks routes
     │
     ├─ "/" ? ❌
     │
     └─ "/api" ? ✅
           │
           ▼
      test.route.js
           │
           ▼
      "/test" matched
           │
           ▼
   test.controller.js
           │
           ▼
     Response sent ✅
