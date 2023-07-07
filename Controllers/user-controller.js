const { User } = require('../Models');

const UserController = {

    getAllUsers(req, res) {
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
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(userInfo)
            })
            .catch(err => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete(req.params.id)
            .then(userInfo => {
                if (!userInfo) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json({ message: 'User deleted' })
            })
            .catch(err => res.status(500).json(err));

    }

}