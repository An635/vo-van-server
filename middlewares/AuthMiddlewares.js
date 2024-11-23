import jwt from 'jsonwebtoken';

export const verifyTokens = (req,res, next) =>{
    // console.log(req.cookies)
    const token = req.cookies.jwt;
    // console.log({token})
    if(!token) return res.status(401).send("You are not authentication")
    jwt.verify(token, process.env.JWT_KEY, async(err, payload)=>{
        if(err) return res.status(403).send("Token is not valid!");
        req.userId = payload.userId;
        next();
    })
};

