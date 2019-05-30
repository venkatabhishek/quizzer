import express from 'express';

import {
    createFlashcards,
    findActivity
} from '../controllers/activity'

import { requireSignin } from '../controllers/auth'

import { findUserById } from '../controllers/user'

const router = express.Router();

router.route("/activity/flashcard/create").post(createFlashcards);

router.route("/activity/:id").get(requireSignin, findActivity);

router.param('id', findUserById);

export default router;