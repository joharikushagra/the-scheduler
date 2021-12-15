import mongoose, { Schema } from 'mongoose';

const InterviewSchema = new Schema({
    candidate: {
        type: String,
        required: ['Candidate email could not be empty.']
    },
    startTime: {
        type: Number,
        required:['Start time is required']
    },
    endTime: {
        type: Number,
        required:['End time is required']
    }, 
    completed: {
        type: Boolean,
        default: false
    }
});

export default mongoose.models.Interview || mongoose.model('Interview', InterviewSchema);