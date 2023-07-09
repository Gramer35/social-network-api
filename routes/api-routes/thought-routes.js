const router = require('express').Router();

const { getThoughts, getSingleThought, newThought, updateThought, deleteThought, newReaction, removeReaction, } = require('../../Controllers/thought-controller');

router.route('/').get(getThoughts).post(newThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(newReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;