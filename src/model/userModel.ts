import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
    canWrite: {
        type: Boolean,
        default: true,
    },
})

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;