import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET_KEY
const verifyAdminToken =(req,res ,next)=>{
    const token = req.headers['authorization']?.split(' ')[1]; // Extracts the token from the "Authorization" header (format: "Bearer <token>")

if(!token) return res.status(401).json({message: "No token provided!"})
jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err) return res.status(401).json({message: "Unauthorized!"})
    if(decoded.role !== 'admin') return res.status(401).json({message: "Unauthorized!"})
    req.user = decoded;
    next();
})


}
export default verifyAdminToken;
