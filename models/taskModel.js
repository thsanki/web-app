const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    taskName: { type: String, required: true },
    dueDate: { type: Date, required: true },
    additionalDetails: { type: String },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
