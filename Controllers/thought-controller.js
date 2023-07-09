const { thought, user, reaction } = require('../models');

const ThoughtController = {

    getThoughts(req, res) {
        thought.find({})
            .then(userThought => res.json(userThought))
            .catch(err => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        thought.findById(req.params.userId)
            .then(userThought => res.json(userThought))
            .catch(err => res.status(500).json(err))
    },

    newThought(req, res) {
        thought.create(req.body)
            .then(userThought => res.json(userThought))
            .catch(err => res.status(500).json(err))
    },

    updateThought(req, res) {
        thought.findOneAndUpdate(req.params.id, req.body, { new: true })
            .then(userThought => {
                if (!userThought) {
                    return res.status(404).json({ message: 'No Thought Found ' })
                }
                res.json(userThought)
            })
            .catch(err => res.status(500).json(err))
    },

    deleteThought(req, res) {
        thought.findOneAndDelete(req.params.id)
            .then(userThought => {
                if (!userThought) {
                    return res.status(404).json({ message: 'No Thought Found' });
                }
                res.json({ message: 'User deleted' })
            })
            .catch(err => res.status(500).json(err));
    },

    newReaction(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addtoSet: { reactions: req.body } },
            { new: true }
        )
            .then(reaction => {
                if (!reaction) {
                    return res.status(404).json({ message: 'No Reaction Found ' })
                }
            })
            .catch(err => res.status(500).json(err))
    },

    removeReaction(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId} } },
            { new: true }
        )
        .then(reaction => {
            if(!reaction) {
                return res.status(404).json({ message: 'No Reaction Found'});
            }
            return res.status(200).json({ message: 'Reaction Removed', reaction})
        
        })
        .catch(err => {
            return res.status(500).json(err);
        })

    }
};

module.exports = ThoughtController;

