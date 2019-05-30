import express from 'express';

import {
    createFlashcards,
    findActivity
} from '../controllers/activity'

import { requireSignin } from '../controllers/auth'

import { findUserById } from '../controllers/user'

const router = express.Router();

router.param('id', findUserById);

router.route('/activity/flashcard/create').post(requireSignin, createFlashcards);

router.route('/activity/:id').get(requireSignin, findActivity);



export default router;