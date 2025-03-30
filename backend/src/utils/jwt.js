import jwt from 'jsonwebtoken'
const generateToken =(user)=>{
    return jwt.sign ({email:user.email,username:user.username},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"7d"}
    )
}
export {generateToken} ;