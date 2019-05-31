import express from 'express';

import {
    createFlashcards,
    updateFlashcards,
    findActivity
} from '../controllers/activity'

import { requireSignin } from '../controllers/auth'

import { findUserById } from '../controllers/user'

const router = express.Router();



router.route('/activity/flashcard/create').post(requireSignin, createFlashcards);

router.route('/activity/flashcard/update').post(requireSignin, updateFlashcards);

router.route('/activity/:id').get(requireSignin, findActivity);



export default router;