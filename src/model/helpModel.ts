import mongoose, { InferSchemaType, model } from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    message: String,
    status: {
        type: Boolean,
        default: false
    },
    solution: String,
    date: {
        type: Date,
        default: new Date()
    }
})
type ContactType = InferSchemaType<typeof ContactSchema>;
const Contact = mongoose.models.Contact || model<ContactType>('Contact', ContactSchema);
export default Contact;