import Flashcards from '../models/flashcards';
import Activity from '../models/activity';

export const createFlashcards = (req, res) => {

    // TODO : USER ID is in req.auth._id. THUS, FIND USER FROM MONGO, then find name, then save according to name


    // const flashcards = new Flashcards(flashcardParams);
    // flashcards.save((err, result) => {
    //     console.log("SAVED")
    //     if (err) {
    //         console.log("FAILURE")
	// 		return res.status(400).json({
	// 			error: "Flashcards could not be created"
	// 		});
	// 	}

    //     console.log("SUCCESS")

    //     return res.json({
    //         _id: result._id
    //     })
    // })
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