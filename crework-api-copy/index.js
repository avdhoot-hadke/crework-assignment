import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import main from "./utils/connectDB.js";
import { User } from "./utils/model.js";
import bcrypt from "bcrypt";

const app = express();
app.use(cookieParser());
app.use(express.json());
dotenv.config();
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);

main();
const secretKey = process.env.SECRET_KEY;
const saltRounds = 10;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("Created User, ", createdUser);
    const token = jwt.sign({ id: createdUser._id }, secretKey);
    res.cookie("token", token);
    res.status(200).json({ createdUser, token });
  } catch (error) {
    console.error(error);
    res.status(403).json(error);
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(403).send("User not found !");
    if (!user?.password) {
      return res.status(403).send("User password is missing!");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user?._id }, secretKey);
    res.cookie("token", token);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(403).json(error);
  }
});

app.post("/add-task", async (req, res) => {
  const token = req.cookies.token;
  const { title, description, status, priority, deadline } = req.body;

  try {
    const user = jwt.verify(token, secretKey);
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { $push: { tasks: { title, description, status, priority, deadline } } },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});

app.get("/tasks", async (req, res) => {
  const token = req.cookies.token;
  console.log(token, "*****");
  try {
    const user = jwt.verify(token, secretKey);

    const data = await User.findById(user.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});

app.patch("/update-task", async (req, res) => {
  const token = req.cookies.token;
  const { title, description, status, priority, deadline, taskID } = req.body;

  try {
    const user = jwt.verify(token, secretKey);
    const updatedUser = await User.findOneAndUpdate(
      { "tasks._id": taskID },
      {
        $set: {
          "tasks.$.title": title,
          "tasks.$.description": description,
          "tasks.$.status": status,
          "tasks.$.priority": priority,
          "tasks.$.deadline": deadline,
        },
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});

app.delete("/delete-task", async (req, res) => {
  const token = req.cookies.token;
  const { taskID } = req.body;
  try {
    const user = jwt.verify(token, secretKey);
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { $pull: { tasks: { _id: taskID } } },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});

app.listen(3001, () => {
  console.log("Listening to port 3001");
});
