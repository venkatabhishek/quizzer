import Flashcards from '../models/flashcards';
import Activity from '../models/activity';

export const createFlashcards = (req, res) => {

    var flashcardParams = {
        title: req.body.title,
        author: req.profile.name,
        category: req.body.category,
        cards: req.body.cards
    }

    const flashcards = new Flashcards(flashcardParams);
    flashcards.save((err, result) => {
        if (err) {
			return res.status(400).json({
				error: "Flashcards could not be created"
			});
		}

        return res.json({
            _id: result._id
        })
    })
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