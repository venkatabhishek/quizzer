import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    createDate: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        default: "Misc."
    },
}, {
    discriminatorKey: "activityType"
})

export default mongoose.model('Activity', activitySchema);