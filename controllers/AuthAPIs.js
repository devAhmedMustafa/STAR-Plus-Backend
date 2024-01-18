const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const cryptoJs = require('crypto-js');
const { isAdmin, userAuthorization } = require('../middlewares/VerifyToken');
const { SendActivisionCode } = require('../middlewares/SendEmails');
const ActivisionCode = require('../models/ActivisionCode');

const CreateUser = async (req, res)=>{

    const new_user = await new User(req.body);
    new_user.password = cryptoJs.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET_HASH
    ).toString();

    try{
        const saved = await new_user.save();
        return res.status(201).json(saved);
    }
    catch(err){
        return res.status(400).json(err);
    }

}

const AuthenticateUser = async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user){
        return res.status(404).send("No username found");
    }
    if (!user.activated) return res.status(403).json("Account is not activated!");
    const password = cryptoJs.AES.decrypt(
        user.password,
        process.env.PASSWORD_SECRET_HASH
    ).toString(cryptoJs.enc.Utf8);
    if(password !== req.body.password){
        return res.status(403).send("Incorrect Password");
    }

    const accessToken = jwt.sign({
        id : user._id, isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET_KEY);

    return res.status(200).json({_id: user._id, token: accessToken});
}

const ActivateUser = async (req, res) => {

    const token = await ActivisionCode.findOne({token: req.params.token});
    if (!token){
        return res.status(403).json("Token not found");
    }

    await User.findOneAndUpdate({_id: token.user}, {activated: true}, {new: true});
    await ActivisionCode.findOneAndRemove({_id: token._id});
    return res.render("AccountActivated.html")

}

const ActivateCode = async (req, res)=>{
    const user = await User.findOne({email: req.body.email});

    await SendActivisionCode(req.body.email, user._doc);
    return res.status(200).json('Sent');
}

const AuthorizeUser = async (req, res)=>{
    userAuthorization(req, res, async()=>{
        const user = await User.findOne({_id: req.params.id})

        if (!user.activated) return res.status(403).json("Account is not activated!");
        const {password, ...userInfo} = user._doc;
        return res.status(200).json(userInfo);
    })
}

const GetUsersList = async(req, res)=>{
    isAdmin(req, res, async ()=>{
        const users_list = await User.find();
        return res.status(200).json(users_list)
    })   
}

const GetUserByUsername = async (req, res)=>{
    const user = await User.findOne({username: req.params.username});
    if (!user){
        return res.status(404).json("No username");
    }
    else{
        return res.status(201).json("Username used");
    }
}

module.exports = {CreateUser, AuthenticateUser, GetUsersList, AuthorizeUser, ActivateCode, ActivateUser, GetUserByUsername}