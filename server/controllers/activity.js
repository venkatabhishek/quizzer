import Flashcards from '../models/flashcards';
import Quiz from '../models/quiz';
import Activity from '../models/activity';
import User from '../models/user';
import mongoose from 'mongoose'

export const createFlashcards = (req, res) => {

    // TODO : USER ID is in req.auth._id. THUS, FIND USER FROM MONGO, then find name, then save according to name

    var flashcardParams = {
        title: req.body.title,
        category: req.body.category,
        author: req.auth._id,
        cards: req.body.cards
    }

    const flashcards = new Flashcards(flashcardParams);
    flashcards.save((err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: "Flashcards could not be created"
            });
        }


        return res.json({
            _id: result._id
        })
    })




}

export const updateFlashcards = (req, res) => {

    Activity.findById(req.body.id).exec((err, activity) => {

        if (err || !activity) {
            return res.status(400).json({
                error: 'Activity not found!'
            })
        }

        if (activity.author != req.auth._id) {
            return res.status(400).json({
                error: 'This activity does not belong to you!'
            });
        }

        activity.title = req.body.title;
        activity.category = req.body.category;
        activity.cards = req.body.cards;

        activity.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: "Flashcards could not be created"
                });
            }


            return res.json({
                _id: result._id
            })
        })

    })

}


export const updateQuiz = (req, res) => {

    Activity.findById(req.body.id).exec((err, activity) => {

        if (err || !activity) {
            return res.status(400).json({
                error: 'Activity not found!'
            })
        }

        if (activity.author != req.auth._id) {
            return res.status(400).json({
                error: 'This activity does not belong to you!'
            });
        }

        activity.title = req.body.title;
        activity.category = req.body.category;
        activity.quiz = req.body.quiz;

        activity.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: "Quiz could not be created"
                });
            }


            return res.json({
                _id: result._id
            })
        })

    })

}

export const createQuiz = (req, res) => {

    var quizParams = {
        title: req.body.title,
        category: req.body.category,
        author: req.auth._id,
        quiz: req.body.quiz
    }

    const quiz = new Quiz(quizParams);
    quiz.save((err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: "Quiz could not be created"
            });
        }


        return res.json({
            _id: result._id
        })
    })


}

export const likeActivity = (req, res) => {
    const id = req.params.id;

    User.findById(req.auth._id, (err, user) => {

        if (err || !user) {
            return res.status(400).json({
                error: 'No user found!'
            });
        }

        var idx = user.liked.indexOf(id);

        Activity.findById(id, (err1, activity) => {

            if (err1 || !activity) {
                return res.status(400).json({
                    error: 'No activity found!'
                });
            }

            if (idx == -1) {
                activity.likes++;
                user.liked.push(id)
            } else {
                activity.likes--;
                user.liked.splice(idx, 1)
            }

            activity.save(err2 => {
                if (err2) {
                    return res.status(400).json({
                        error: "Activity save error"
                    })
                }

                User.findOneAndUpdate({ _id: req.auth._id }, user, function(err3) {
                    if (err3) {
                        return res.status(400).json({
                            error: "User save error"
                        })
                    }

                    res.json({
                        message: "Success"
                    })
                })
            })

        })
    })


}

export const findActivity = (req, res) => {
    var id = req.params.id;
    Activity.findById(id, (err, activity) => {
        if (err || !activity) {
            return res.status(400).json({
                error: 'No activity found!'
            });
        }

        return res.json(activity);
    })

}

export const getActivities = (req, res) => {
    Activity.find({ author: req.auth._id }).exec(function(err, activities) {

        return res.json(activities)
    });
}

export const getLikedActivities = (req, res) => {
    User.findById(req.auth._id, (err, user) => {
        if (err || !user) {
            console.log(err)
            return res.status(400).json({
                error: 'User not found!'
            });
        }


        var ids = user.liked.map(act => {
            return mongoose.Types.ObjectId(act)
        })

        Activity.find({
            _id: {
                $in: ids
            }
        }, (err, docs) => {

            if(err){
                res.status(400).json({
                    error: "Find error"
                })
            }

            res.json(docs)
        })


    })
}


export const deleteActivity = (req, res) => {
    var id = req.params.id;
    Activity.findById(id, (err, activity) => {
        if (err || !activity) {
            return res.status(400).json({
                error: 'No activity found!'
            });
        }

        if (activity.author != req.auth._id) {
            return res.status(400).json({
                error: 'You are not authorized to do that!'
            });
        }

        Activity.deleteOne({ _id: activity._id }, (err) => {
            if (err) {
                return res.status(400).json({
                    error: 'Delete failed!'
                });
            }

            return res.json({
                message: "Delete success"
            })
        })
    })

}

export const getAllActivities = (req, res) => {
    Activity.find({}).populate({ model: User, path: "author" }).exec((err, activities) => {
        if (err || !activities) {
            console.log(err)
            return res.status(400).json({
                error: 'No activities found!'
            });
        }

        return res.json(activities)
    })
}

export const searchActivities = (req, res) => {
    var q = req.body.q;

    Activity.find({
        $text: {
            $search: q
        }
    }).then(results => {
        return res.json({
            results
        })
    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            error: "Search error!"
        })
    })


}


export const setScore = (req, res) => {
    User.findById(req.auth._id, (err, user) => {
        if (err || !user) {
            console.log(err)
            return res.status(400).json({
                error: 'User not found!'
            });
        }

        var prevScore = user.scores.get((req.body.id).toString());

        if (prevScore) {
            if (req.body.score <= prevScore) {
                // user scored better in the past

                return res.status(400).json({
                    error: 'You score better on a previous try. Better luck next time!'
                });
            }

        }

        user.scores.set((req.body.id).toString(), req.body.score);

        User.findOneAndUpdate({ _id: req.auth._id }, user, function(error) {
            if (error) {
                return res.status(400).json({
                    error: "User save error"
                })
            }

            return res.json({
                message: "Success"
            })
        })

    })
}

