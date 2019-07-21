import User from '../models/user';
import errorHandler from '../helpers/dbErrorHandler';
import jwt from 'jsonwebtoken';
import config from '../config';

export const registerUser = (req, res, next) => {
    const user = new User(req.body);
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            config.jwtSecret
        );

        res.cookie('t', token, {
            expire: new Date() + 9999
        });

        return res.json({
            token,
            user: { _id: result._id, name: result.name, email: result.email }
        });
    });
};

export const findUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'No user found with that credentials!'
            });
        }
        req.profile = user;
        next();
    });
};

export const findUserProfile = (req, res) => {
    // eliminate password related fields before sending the user object
    req.profile.hashedPassword = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

export const deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }
        deletedUser.hashedPassword = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

export const updateUserProfile = (req, res) => {
    User.findById(req.auth._id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'No user found with that credentials!'
            });
        }

        if (req.body.name) { user.name = req.body.name; }
        if (req.body.email) { user.email = req.body.email; }
        if (req.body.password) { user.password = req.body.password; }

        User.findOneAndUpdate({ _id: req.auth._id }, user, function(error) {
            if (error) {
                return res.status(400).json({
                    error: "User save error"
                })
            }

            res.json({
                message: "Success"
            })
        })

    });
}