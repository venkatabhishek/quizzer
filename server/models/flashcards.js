import mongoose from 'mongoose'
import Activity from './activity';

const Schema = mongoose.Schema;

const FlashcardsSchema = new Schema({
    cards: [{
        front: String,
        back: String
    }]
})

export default Activity.discriminator('Flashcards', FlashcardsSchema);