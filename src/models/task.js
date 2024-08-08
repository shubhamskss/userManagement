const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date, 
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'], 
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'], 
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('task', taskSchema);
