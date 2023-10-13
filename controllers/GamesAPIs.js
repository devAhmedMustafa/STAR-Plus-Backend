const upload = require('../middlewares/azure_blob_upload');
const Game = require('../models/GameSchema');

const GamesList = async (req, res)=>{
    const games_list = await Game.find();
    return res.status(200).json(games_list)
};

const GetGame = async (req, res)=>{
    const _name = req.params.name;
    const game = await Game.findOne({name: _name});
    return res.status(200).json(game);
}

const AddGame = async (req, res, next)=>{
    const new_game = new Game(req.body);
    try{
        if (req.files[0]){
            new_game.cover = req.files[0].path;
        }
        if (req.files[1]){
            new_game.trailer = req.files[1].path;
        }
        if (req.files[2]){
            new_game.game_files = req.files[2].path;
        }
        
        const saved = await new_game.save();
        next();
        return res.status(201).json(saved);
    }
    catch(err){
        return res.status(400).json(err);
    }

}

const EditGame = async(req, res)=>{
    try{
        const game = await Game.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        return res.status(200).json(game);
    }
    catch(err){
        return res.status(400).json(err);
    }
}

const DeleteGame = async (req, res)=>{

    const deleted = await Game.findByIdAndDelete(req.params.id);
    return res.status(302).json(deleted);
}

const DownloadGame = async (req, res)=>{
    try{
        const game = await Game.findOne({_id: req.params.id})
        const fileURL = game.game_files;
        return res.download(fileURL, `${game.name}.rar`);
    }
    catch(err){
        return res.status(500).json(err);
    }
}

const GameSize = async (req, res)=>{
    try{
        const game = await Game.findOne({_id: req.params.id})
        
    }
    catch(err){
        return res.status(500).json(err);
    }
}

module.exports = {GamesList, GetGame, AddGame, DeleteGame, EditGame, DownloadGame}