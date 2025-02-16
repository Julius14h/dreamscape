require("dotenv").config();
const express = require("express");
const cors = require("cors");

const dreamRoutes = require("./routes/dreamRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/dreams", dreamRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));