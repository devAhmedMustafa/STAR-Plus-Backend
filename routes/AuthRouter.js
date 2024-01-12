const router = require('express').Router();

const {CreateUser, AuthenticateUser, GetUsersList, AuthorizeUser} = require('../controllers/AuthAPIs');

router.route('/create').post(CreateUser);
router.route('/authenticate').post(AuthenticateUser);
router.route('/authorize/:id').get(AuthorizeUser);
router.route('/users_list').get(GetUsersList)

module.exports = router