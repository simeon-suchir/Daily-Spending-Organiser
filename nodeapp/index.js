const express = require("express");
const mongoose = require("mongoose");
const category_Routes = require("./routes/categoryRoutes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST", "DELETE","PUT"], allowedHeaders: ["Content-Type"] }));

const MONGO_URI = "mongodb://127.0.0.1:27017/daily";
mongoose.connect(MONGO_URI)
 .then(() => console.log("Connected to MongoDB"))
 .catch(err => console.error("MongoDB connection failed:", err));

app.use("/api/categories", category_Routes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));