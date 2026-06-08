const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('ok')
});
// router.get('/:id', userController.getUsers);
// router.post('/', userController.getUsers);
// router.get('/', userController.getUsers);

module.exports = router;