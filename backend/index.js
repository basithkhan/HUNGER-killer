const express = require("express");
const cors = require("cors");
const app = express();
const mongoDB = require("./db");

// Use cors middleware
app.use(cors());

app.use(express.json());

// Use async function to ensure that mongoDB completes before moving on
const startServer = async () => {
  try {
    // Connect to MongoDB and then start the server
    await mongoDB();

    const createuserroute = require("./Routes/createuserroute");
    const displayDataRoute = require("./Routes/DisplayData");

    app.use("/api", createuserroute);
    app.use("/api", displayDataRoute);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
};

startServer();
