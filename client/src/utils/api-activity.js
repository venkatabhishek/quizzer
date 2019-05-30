export const createFlashcards = flashcards => {

    // map editorStates to stringified json

    console.log(flashcards)

    // return fetch('/activity/flashcard/create', {
    //     method: 'POST',
	// 	headers: {
	// 		Accept: 'application/json',
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify(user)
    // })
    //     .then(response => {
	// 		return response.json();
	// 	})
	// 	.catch(err => console.log(err));
}

export const findActivity = id => {
    return fetch('/activity/' + id, {
        method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
    })
        .then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
}