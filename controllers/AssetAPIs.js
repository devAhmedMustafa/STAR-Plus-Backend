const MeshAsset = require("../models/AssetSchema")

const AddAsset = async (req, res)=>{
    const new_mesh = new MeshAsset(req.body);
    try{
        const saved = await new_mesh.save();
        return res.status(201).json(saved);
    }
    catch(err){
        return res.status(400).json(err);
    }

}

module.exports = {AddAsset}