import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    eventName: String,
    name: String,
    year: String,
    department: String,
    documentUrl: String,
    refNo: Number
})

const Certificate =mongoose.models.certificate || mongoose.model('certificate', certificateSchema);
export default Certificate;