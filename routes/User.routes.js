const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/User.model");

const userRoutes = express.Router();

// to register user
userRoutes.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  const user1 = await UserModel.findOne({ email });
  console.log(user1);

  if (user1?.email == email) {
    res.status(200).send({ msg: "Email id already exists" });
  } else {
    try {
      bcrypt.hash(pass, 5, async (err, hash) => {
        if (err) {
          res.status(400).send({ err: err.message });
        }

        const user = new UserModel({ ...req.body, pass: hash });
        await user.save();
        res.status(200).send({ msg: "User Registered" });
      });
    } catch (error) {
      res.status(400).send({ err: error.message });
    }
  }
});

// to login user

userRoutes.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user1 = await UserModel.findOne({ email });
    console.log(user1);

    if (user1) {
      bcrypt.compare(pass, user1.pass, async (err, result) => {
        if (err) {
          res.status(400).send({ err: err.message });
        }

        if (result) {
          const token = jwt.sign(
            { userID: user1._id, username: user1.name },
            "rahul"
          );
          res.status(200).send({ msg: "login successfull", token });
        } else {
            res.status(200).send({ msg: "wrong password" });
        }
      });
    } else {
      res.status(200).send({ msg: "user not found " });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = { userRoutes };
