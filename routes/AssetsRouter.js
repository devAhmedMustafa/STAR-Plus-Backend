const router = require('express').Router();
const {AddAsset} = require("../controllers/AssetAPIs")

router.route('/').post(AddAsset);

module.exports = router