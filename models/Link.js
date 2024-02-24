import mongoose, { Schema } from "mongoose";

const linkSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    originalUrl: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

export default mongoose.model('Link', linkSchema);