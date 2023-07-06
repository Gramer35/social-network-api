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
        User.findOneAndUpdate
    }

}