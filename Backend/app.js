const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoUrl =
  "mongodb+srv://alpanakushwaha02:mc2VA7K6Je5jfYgQ@cluster0.s3snwrj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = "uh349r34ri-[]dkeiof088f032ke-2l";

app.use(express.json());

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

require("./userDetails");
require("./item");

const User = mongoose.model("UserInfo");
const Item = mongoose.model("ItemInfo");

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.post("/register", async (req, res) => {
  const { email, password, name, mobileNo, rollNo } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.send({ data: "User already exists!" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      email: email,
      password: encryptedPassword,
      name: name,
      mobileNo: mobileNo,
      rollNo: rollNo,
    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (!oldUser) {
    return res.send({ data: "User doesn't exist!" });
  }
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      JWT_SECRET
    );
    return res.status(201).send({ status: "ok", data: token });
  } else {
    return res.status(401).send({ error: "Invalid credentials" });
  }
});

app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "Ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error });
  }
});

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Unauthorized" });
  }
};

app.post("/items", authenticate, async (req, res) => {
  const { name, description, category, price, quantity, imageUrl } = req.body;
  const owner = req.user.id;
  if (!category || !price) {
    return res.status(400).send({ error: "Category and Price are required" });
  }
  try {
    const newItem = new Item({
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
      owner,
    });
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.get("/items", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await Item.find({ owner: { $ne: userId } });
    res.json(items);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.listen(5001, () => {
  console.log("Node.js server started on port 5001");
});
