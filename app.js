const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Course = require('./models/courseModel');
const Task = require('./models/taskModel');


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/student_tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());
 app.use(express.static('public'))


app.post('/submitTask', async (req, res) => {
    try {
        const { courseId, taskName, dueDate, additionalDetails } = req.body;

        const courseExists = await Course.exists({ courseId });
        if (!courseExists) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const newTask = new Task({
            courseId,
            taskName,
            dueDate,
            additionalDetails,
        });

        await newTask.save();

        res.status(201).json({ message: 'Task submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/courses/:courseId/tasks', async (req, res) => {
    try {
        const courseId = req.params.courseId;

        const tasks = await Task.find({ courseId });

        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for the course' });
        }

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
