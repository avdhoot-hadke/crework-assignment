import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: {
        type: String, enum: ["To-Do", "In Progress", "Under Review", "Completed"],
        required: true,
    },
    priority: {
        type: String, enum: ["Low", "Medium", "Urgent"],
        required: false,
    },
    deadline: { type: Date, required: false }
});

export const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 4 },
    tasks: [taskSchema],
});



export const User = mongoose.model("User", userSchema);
