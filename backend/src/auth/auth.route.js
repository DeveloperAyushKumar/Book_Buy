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
  service: "gmail", // brevo SMTP server
  // port: 587, // Use 465 for SSL, or 587 for TLS
  // secure: false, // `true` for SSL, `false` for TLS
  auth: {
    user: process.env.EMAIL, // Your Zoho email
    pass: process.env.EMAIL_PASS, // Your Zoho app password
  },
});


// ✅ Email & Password Signup
router.post("/signup", async (req, res) => {
  const { email, password,username  } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user&&user.verified ) return res.status(400).json({ message: "Email already exists" });
    if(!user){
console.log("signup password", password)
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("signup hash", hashedPassword)
      user = new User({ email,username, password: hashedPassword, verified: false });
      await user.save();
    }
    
    
    const verificationToken = jwt.sign({ email,username }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
    const link = `http://localhost:3000/api/auth/verify-email?token=${verificationToken}`;
    console.log(process.env.EMAIL , email)
    await transporter.sendMail({ from: process.env.EMAIL, to: email, subject: "Verify Email", text: `Click here: ${link}` });

    res.json({ message: "Check your email for verification link" });
  } catch (err) {
    console.error("error in signup ",err)
    res.status(500).json({ error: err.message });
  }
});

// ✅ Email Verification
router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    await User.updateOne({ email: decoded.email }, { verified: true });
    const tokenAuth =generateToken({email :decoded.email,username:decoded.username});
    res.redirect(`http://localhost:5173?token=${tokenAuth}`);
  } catch {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

// ✅ Login (Email & Password)
router.post("/login", async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("login password",password)
    console.log("login hash ",user.password)
    const isValid= await bcrypt.compare(password, user.password);
    console.log(isValid)

    if (!user || !(isValid)) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.verified) return res.status(403).json({ message: "Email not verified login again" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, message: "Login successful" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Google OAuth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/me", async (req,res)=>{
try {
  // console.log(req.headers)
  const authHeader=req.headers.authorization;
  if(!authHeader||!authHeader.startsWith("Bearer ")){
    return res.status(401).json({messsage:"Unauthorized : No token provided"})
  }
  const token =authHeader.split(" ")[1];
  // verify token
  // console.log("token ",token)

  const decoded=jwt.verify(token, process.env.JWT_SECRET_KEY)
  // console.log(decoded)
  // send user info 
  res.json({user:{email:decoded.email, username :decoded.username }})
  
} catch (error) {
  console.error("error verifying token ",error);
  res.status(403).json({message:"Forbidden: Invalid token "})
  
}

})
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", session:false }), (req, res) => {
  // console.log("Authenticated User",req.user)
  const token =generateToken({email:req.user.email,username :req.user.username})
  // console.log(jwt.verify(token,process.env.JWT_SECRET_KEY))
  res.redirect(`http://localhost:5173?token=${token}`);
});

export default router;
