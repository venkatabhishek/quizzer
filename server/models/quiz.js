import mongoose from 'mongoose'
import Activity from './activity';

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    quiz: [{
        question: String,
        answers: [String],
        correct: Number
    }]
})

export default Activity.discriminator('Quiz', QuizSchema);