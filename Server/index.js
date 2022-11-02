const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const eventsJson = require("./events.json");
const User = require("./models/user.model");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/api/signup", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok", message: "User created successfully" });
  } catch (err) {
    console.log("Error", err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (!user) {
      return res.json({ status: "error", error: "Invalid email/password" });
    }
    if (user.password === req.body.password) {
      const token = jwt.sign(
        { name: user.name, email: user.email },
        "doWellInPresentation!"
      );
      return res.json({ status: "ok", token: token });
    } else {
      res.json({ status: "error", error: "Invalid email/password" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Invalid email/password" });
  }
});

app.get("/api/events", (req, res) => {
  res.json(eventsJson);
});

app.post("/api/creategroup", async (req, res) => {
  const token = req.body.token;
  console.log("Create Group API Token -", token);
  try {
    const decoded = jwt.verify(token, "doWellInPresentation!");
    const decodedEmail = decoded.email;
    console.log("Create Group API Decoded Email", decodedEmail);
    console.log("Create Group API Data", req.body.name, req.body.location);
    const user = await User.updateOne(
      { email: decodedEmail },
      {
        $push: {
          groups: { gName: req.body.name, gLocation: req.body.location },
        },
      }
    );

    res.json({ status: "ok", message: "Group created successfully" });
  } catch (err) {
    console.log();
    res.json({ status: "error", message: err });
  }
});

app.get("/api/yourgroups", async (req, res) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  try {
    const decoded = jwt.verify(token, "doWellInPresentation!");
    const decodedEmail = decoded.email;
    console.log(decodedEmail);
    const user = await User.findOne({ email: decodedEmail }, { groups: 1 });
    res.json({
      status: "ok",
      message: "Groups fetched successfully",
      data: user,
    });
  } catch (err) {
    res.json({ status: "error", message: err });
  }
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen("6969", () => {
      console.log("Server Started on Port 6969");
    });
  })
  .catch((error) => {
    console.log(error);
  });
