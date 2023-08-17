import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { db } from "../../connect.js";

export const registerUser = (req, res) => {
  //CHECK IF THE USER EXIST
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) res.status(400).json("User already exists");

    //HASH PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    // ADDING NEW USER
    const q =
      "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashPassword,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "User created Successfully", data });
    });
  });
};

export const loginUser = (req, res) => {
  //CHECK USER NAME
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username],  (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    //COMPARE PASSWORD
    const comparePassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!comparePassword)
      return res.status(400).json("Wrong password or username");

    const token = jwt.sign({ id: data[0].id }, "araoluwanimi");
    const { password, ...other } = data[0];
    // res.status(200).json({message:"UserLogin successfully", data: other, token:token})

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Successful", data: other, token });
  });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken",{
        secure:true,
        sameSite: "none"
    }).status(200).json("User Logout sccessfull")
};
