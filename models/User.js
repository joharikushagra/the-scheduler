import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: ['Please enter user name.']
    },
    email: {
        type: String,
        required: ['Email is required.'],
        unique: ['Email already exists.']
    },
    interviews: [{type: mongoose.Types.ObjectId, ref: "Interview"}],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);