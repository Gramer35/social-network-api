const router = require('express').Router();

const { getUsers, getSingleUser, newUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../Controllers/user-controller');

router.route('/').get(getUsers).post(newUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;