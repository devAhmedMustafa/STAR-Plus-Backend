const multer = require('multer');
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `./uploads/file-storage`)
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const account = "starplus";
const accountKey = "D34AC6j2BsmhrvpsMC5nUIyVD04mWqsy8YKd8pSvEtZYyUNOpIdL7tzeaRBPBWKSzyazxf/OCcEP+ASt/D28ZQ==";

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const container = "covers";

const upload = multer({storage:storage})

module.exports = upload