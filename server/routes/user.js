import express from 'express';
import {
	registerUser,
	findUserById,
	findUserProfile,
	deleteUser,
    updateUserProfile
} from '../controllers/user';

// import them to protect routes
import { requireSignin, hasAuthorization } from '../controllers/auth';

const router = express.Router();

router.route('/api/users').post(registerUser);


router
	.route('/api/users/:userId')
	.get(requireSignin, findUserProfile)
	.delete(requireSignin, hasAuthorization, deleteUser);

router.route('/api/users/update').post(requireSignin, updateUserProfile)

router.param('userId', findUserById);

export default router;