const jwt = require('jsonwebtoken');

const VerifyToken = (req, res, next)=>{
    const token = req.headers.token;
    if(!token){
        return res.status(401).json("Not authenticated");
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
        if(err) res.status(403).json("Token is not valid");
        else{
            req.user = user;
            next();
        }
    })
}

const userAuthorization = (req, res, next)=>{
    VerifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Not Allowed");
        }
    })
}

const isAdmin = (req, res, next)=>{
    VerifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Not Allowed");
        }
    })
}

module.exports = {VerifyToken, userAuthorization, isAdmin};