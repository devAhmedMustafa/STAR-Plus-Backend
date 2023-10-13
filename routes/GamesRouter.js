const router = require('express').Router();
const upload_file = require('../middlewares/file_upload')

const {GamesList, GetGame, AddGame, DeleteGame, EditGame, DownloadGame} = require('../controllers/GamesAPIs');

router.route('/').get(GamesList);
router.route('/:name').get(GetGame);
router.route('/:id').put(EditGame);
router.route('/').post(upload_file.array('file') ,AddGame);
router.route('/:id').delete(DeleteGame);
router.route('/download/:id').get(DownloadGame);

module.exports = router