import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: String,
    photo: String,
    position: String,
    year: String,
    dept: String,
    email: String,
    phone: String,
    socialLinks: {
        facebook: String,
        linkedin: String,
        instagram: String,
    }
})

const Team =mongoose.models.team ||  mongoose.model('team', teamSchema);
export default Team;