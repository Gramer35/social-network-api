const { Thought, user, reaction } = require('../models');

const ThoughtController = {

    getThoughts(req, res) {
        Thought.find({})
            .then(userThought => res.json(userThought))
            .catch(err => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        Thought.findById(req.params.thoughtId)
            .then(userThought => res.json(userThought))
            .catch(err => res.status(500).json(err))
    },

    newThought(req, res) {
        Thought.create(req.body)
            .then(userThought => res.json(userThought))
            .catch(err => res.status(500).json(err))
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })

            if (!thought) {
                return res.status(404).json({ message: 'No Thought Found ' })
            } else {
                res.json(thought)
            }} catch (err) {
                res.status(500).json(err)
            }
        },

    deleteThought(req, res) {
        Thought.findOneAndDelete(req.params.id)
            .then(userThought => {
                if (!userThought) {
                    return res.status(404).json({ message: 'No Thought Found' });
                }
                res.json({ message: 'User deleted' })
            })
            .catch(err => res.status(500).json(err));
    },

    async newReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            thought ? res.json(thought) : res.status(404).json({ message: notFound });
        } catch (e) {
            res.status(500).json(e);
        }

    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            thought ? res.json(thought) : res.status(404).json({ message: notFound })
        } catch (err) {
            res.status(500).json(err);
        }

    }
};

module.exports = ThoughtController;

