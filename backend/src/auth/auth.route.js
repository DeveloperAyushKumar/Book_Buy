import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import passport from "passport";
import User from "../users/user.model.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
});

// ✅ Email & Password Signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });

    user = new User({ email, password: hashedPassword, verified: false });
    await user.save();

    const link = `http://localhost:3000/verify-email?token=${verificationToken}`;
    await transporter.sendMail({ from: process.env.EMAIL, to: email, subject: "Verify Email", text: `Click here: ${link}` });

    res.json({ message: "Check your email for verification link" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Email Verification
router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await User.updateOne({ email: decoded.email }, { verified: true });
    res.json({ message: "Email verified! You can now log in." });
  } catch {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

// ✅ Login (Email & Password)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.verified) return res.status(403).json({ message: "Email not verified" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, message: "Login successful" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Google OAuth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/me", async (req,res)=>{
try {
  console.log(req.headers)
  const authHeader=req.headers.authorization;
  if(!authHeader||!authHeader.startsWith("Bearer ")){
    return res.status(401).json({messsage:"Unauthorized : No token provided"})
  }
  const token =authHeader.split(" ")[1];
  // verify token
  console.log("token ",token)

  const decoded=jwt.verify(token, process.env.JWT_SECRET_KEY)
  console.log(decoded)
  // send user info 
  res.json({email:decoded.email, username :decoded.username })
  
} catch (error) {
  console.error("error verifying token ",error);
  res.status(403).json({message:"Forbidden: Invalid token "})
  
}

})
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", session:false }), (req, res) => {
  console.log("Authenticated User",req.user)
  const token =generateToken({email:req.user.email,username :req.user.username})
  console.log(jwt.verify(token,process.env.JWT_SECRET_KEY))
  res.redirect(`http://localhost:5173?token=${token}`);
});

export default router;
