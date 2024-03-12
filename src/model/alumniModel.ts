import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema({
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

const Alumni = mongoose.models.Alumni || mongoose.model('Alumni', alumniSchema);
export default Alumni;