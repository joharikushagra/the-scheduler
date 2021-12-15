import mongoose, { Schema } from 'mongoose';

const InterviewSchema = new Schema({
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: ['Candidate could not be empty.']
    }],
    // candidate: {
    //     type: String
    // },
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