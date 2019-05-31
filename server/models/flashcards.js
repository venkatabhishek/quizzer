import mongoose from 'mongoose'
import Activity from './activity';

const Schema = mongoose.Schema;

const FlashcardsSchema = new Schema({
    cards: [{
        front: Schema.Types.Mixed,
        back: Schema.Types.Mixed
    }]
})

export default Activity.discriminator('Flashcards', FlashcardsSchema);