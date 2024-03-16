import mongoose from 'mongoose';

const membersSchema = new mongoose.Schema({
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

const Member = mongoose.models.Member || mongoose.model('Member', membersSchema);
export default Member;