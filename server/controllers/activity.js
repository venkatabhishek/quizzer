import Flashcards from '../models/flashcards';
import Quiz from '../models/quiz';
import Activity from '../models/activity';
import User from '../models/user';

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
    Activity.find({}).populate({model: User, path: "author"}).exec((err, activities) => {
        if (err || !activities) {
            console.log(err)
            return res.status(400).json({
                error: 'No activities found found!'
            });
        }

        return res.json(activities)
    })
}