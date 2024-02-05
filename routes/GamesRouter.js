const router = require('express').Router();

const {GamesList, GetGame, AddGame, DeleteGame, EditGame, DownloadGame} = require('../controllers/GamesAPIs');
const { isAdmin } = require('../middlewares/VerifyToken');

router.route('/').get(GamesList);
router.route('/:name').get(GetGame);
router.route('/:id').put(EditGame);
router.route('/').post(isAdmin, AddGame);
router.route('/:id').delete(DeleteGame);
router.route('/download/:id').get(DownloadGame);

module.exports = router