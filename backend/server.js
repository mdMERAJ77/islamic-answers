// Why this file exists
// Starts the server
// Connects DB
// Keeps app.js clean
// Easy to debug:
// DB issue → db.js
// Server issue → server.js

import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
dotenv.config(); //load .env file

//connect database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});


