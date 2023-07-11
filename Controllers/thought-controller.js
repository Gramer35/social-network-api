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

    updateThought(req, res) {
        Thought.findOneAndUpdate(req.params.id, req.body, { new: true })
            .then(userThought => {
                if (!userThought) {
                    return res.status(404).json({ message: 'No Thought Found ' })
                }
                res.json(userThought)
            })
            .catch(err => res.status(500).json(err))
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
                {_id:req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );
            thought ? res.json(thought) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }

        // Thought.findOneAndUpdate(
        //     { _id: req.params.thoughtId },
        //     { $addtoSet: { reaction: req.body } },
        //     { runValidators: true, new: true }
        // )
        //     .then(reaction => {
        //         if (!reaction) {
        //             return res.status(404).json({ message: 'No Reaction Found ' })
        //         }
        //         res.json(reaction);
        //     })
        //     .catch(err => res.status(500).json(err))
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then(reaction => {
                if (!reaction) {
                    return res.status(404).json({ message: 'No Reaction Found' });
                }
                return res.status(200).json({ message: 'Reaction Removed', reaction })

            })
            .catch(err => {
                return res.status(500).json(err);
            })

    }
};

module.exports = ThoughtController;

