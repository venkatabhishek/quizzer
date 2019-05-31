import Flashcards from '../models/flashcards';
import Activity from '../models/activity';
import User from '../models/user';

export const createFlashcards = (req, res) => {

    // TODO : USER ID is in req.auth._id. THUS, FIND USER FROM MONGO, then find name, then save according to name

    User.findById(req.auth._id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'No user found with that credentials!'
			});
		}

        var flashcardParams = {
            title: req.body.title,
            category: req.body.category,
            author: user.email,
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

	});


}

export const updateFlashcards = (req, res) => {
    User.findById(req.auth._id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'No user found with that credentials!'
			});
		}

        Activity.findById(req.body.id).exec((err, activity) => {

            if(err || !activity){
                return res.status(400).json({
                    error: 'Activity not found!'
                })
            }

            if(activity.author != user.email){
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



	});
}

export const createQuiz = (req, res) => {

}

export const findActivity = (req, res) => {
    var id = req.params.id;
    Activity.findById(id, (err, activity) => {
        if(err || !activity){
            return res.status(400).json({
				error: 'No activity found!'
			});
        }

        return res.json(activity);
    })

}