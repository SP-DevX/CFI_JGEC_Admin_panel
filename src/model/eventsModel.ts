import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema({
    shortName: String,
    fullName: String,
    description: String,
    photo: String,
    date: String,
    type: String,
    organizer: String,
    prizePool: [String],
    winners: [
        {
            position: String,
            teamName: String,
            teamMembers: [String],
            modelName: String,
            modelPhoto: String
        }
    ]
})

const Event = mongoose.models.Event ||  mongoose.model('Event', eventsSchema);
export default Event;