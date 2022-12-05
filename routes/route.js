
const express = require('express');


const router = express.Router();

const { getUsers, addUser, getUserById, deleteUser, updateUser, loginUser } =  require('../controller/userController');
const checkLogin = require('../middlewares/checkedLogin');

// get users
router.get('/users',  getUsers);

// post user data
router.post('/addUser', addUser);

// user find by id
router.get('/user/:id', getUserById);

// delete user by id
router.delete('/delete/:id', checkLogin, deleteUser);

// update user data
router.put('/update/:id',checkLogin, updateUser);

// login user
router.post('/login', loginUser);

module.exports = router