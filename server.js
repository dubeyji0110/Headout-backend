if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./utils/connectDB");
const rootRouter = require("./api/router");

const app = express();
const PORT = process.env.PORT || 3500;

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRouter);

app.get("/", (req, res, next) => res.status(200).send("Hello There :)"));

app.all("*", (req, res, next) => {
	res.status(404).send("Invalid Route");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
