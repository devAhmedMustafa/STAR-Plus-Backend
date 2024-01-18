const router = require('express').Router();

const {CreateUser, AuthenticateUser, GetUsersList, AuthorizeUser, ActivateCode, ActivateUser, GetUserByUsername} = require('../controllers/AuthAPIs');

router.route('/create').post(CreateUser);
router.route('/authenticate').post(AuthenticateUser);
router.route('/authorize/:id').get(AuthorizeUser);
router.route('/users_list').get(GetUsersList);
router.route('/send_activate_token').post(ActivateCode);
router.route('/activate/:token').get(ActivateUser);
router.route('/getUserByUsername/:username').get(GetUserByUsername);

module.exports = router