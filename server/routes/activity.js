import express from 'express';

import {
    createFlashcards,
    updateFlashcards,
    createQuiz,
    updateQuiz,
    findActivity,
    getActivities,
    deleteActivity,
    getAllActivities,
    likeActivity,
    searchActivities
} from '../controllers/activity'

import { requireSignin, hasAuthorization } from '../controllers/auth'

import { findUserById } from '../controllers/user'

const router = express.Router();



router.route('/activity/flashcard/create').post(requireSignin, createFlashcards);

router.route('/activity/flashcard/update').post(requireSignin, updateFlashcards);

router.route('/activity/quiz/create').post(requireSignin, createQuiz);

router.route('/activity/quiz/update').post(requireSignin, updateQuiz);

router.route('/activity/user').get(requireSignin, getActivities);

router.route('/activity/all').get(getAllActivities);

router.route('/activity/search').post(searchActivities);

router.route('/activity/like/:id').post(requireSignin, likeActivity)

router.route('/activity/:id').get(findActivity).delete(requireSignin, deleteActivity);





export default router;