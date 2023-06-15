const router = require('express').Router();
const {
    createUser,
    getUsers,
    addFriend,
    deleteFriend,
    getSingleUser,
    updateUser,
    deleteUser,
  } = require('../../controllers/userController');

  // /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;
