const { User } = require('../models');

const UserController = {

    getUsers(req, res) {
        User.find({})
            .then(userInfo => res.json(userInfo))
            .catch(err => res.status(500).json(err))
    },

    getSingleUser(req, res) {
        User.findById(req.params.userId)
            .then(userInfo => res.json(userInfo))
            .catch(err => res.status(500).json(err))
    },

    newUser(req, res) {
        User.create(req.body)
            .then(userInfo => res.json(userInfo))
            .catch(err => res.status(500).json(err))
    },

    updateUser(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
            .then(userInfo => {
                if (!userInfo) {
                    return res.status(404).json({ message: 'No User Found' });
                }
                res.json(userInfo)
            })
            .catch(err => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete(req.params.id)
            .then(userInfo => {
                if (!userInfo) {
                    return res.status(404).json({ message: 'No User Found' });
                }
                res.json({ message: 'User deleted' })
            })
            .catch(err => res.status(500).json(err));

    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId } },
            { new: true }
        )
            .then(friend => {
                if (!friend) {
                    return res.status(404).json({ message: 'No User Found' });
                }
                res.json(friend);
            })
            .catch(err => res.status(500).json(err));
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.body.friendId } },
            { new: true }
        )
            .then((friend) => {
                if (!friend) {
                    return res.status(404).json({ message: 'No Friend Found' });
                }

                const removed = !friend.friends.includes(param.friendId);

                if (removed) {
                    res.json({ message: 'Friend has been removed', friend })
                } else {
                    res.json(friend);
                }
            })
            .catch((err) => res.status(400).json(err));
    }

}

module.exports = UserController;