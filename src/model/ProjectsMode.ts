import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projectId: String,
    title: String,
    overview: String,
    name: String,
    year: String,
    demo: String,
    details: String,
    code: String,
    photo: String
}, { timestamps: true }); 

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
