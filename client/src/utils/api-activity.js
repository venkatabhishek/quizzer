import { convertToRaw, convertFromRaw } from 'draft-js'

export const createFlashcards = (flashcards, credentials) => {

    // map editorStates to stringified json

    if(!flashcards.category){
        flashcards.category = 'Misc.'
    }

    if(!flashcards.title){
        flashcards.title = 'Untitled'
    }

    flashcards.cards.map((card) => {

        var front = (card.front).getCurrentContent();
        var back = (card.back).getCurrentContent();

        card.front = convertToRaw(front);
        card.back = convertToRaw(back);

        return card;
    })

    return fetch('/activity/flashcard/create', {
        method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
            Authorization: 'Bearer ' + credentials.t
		},
		body: JSON.stringify(flashcards)
    }).then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
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