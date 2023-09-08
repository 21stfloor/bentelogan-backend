const mongoose = require('../db');
const studentSchema = require('../Models/User.model');
const Student = mongoose.model('Student', studentSchema);

function createStudent(req,res) {
    const { studentId, name, password, email } = req.body;

    const studentSchema = new Student({
        "studentId": studentId,
        "name": name,
        "password": password,
        "email": email
    });

    studentSchema.save()
    .then(() => {
        res.status(201).json({ message: 'Student created successfully' });
    })
    .catch((err) => {
        res.status(417).json({ error: 'Failed to create' });
    });
}

async function readStudent(req, res) {
    const studentId = req.params.studentId;

    try {
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateStudent(req, res) {
    const studentId = req.params.studentId;
    const updatedFields = req.body;

    try {
        const student = await Student.findOneAndUpdate({ studentId }, updatedFields, { new: true });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteStudent(req, res) {
    const studentId = req.params.studentId;

    try {
        const student = await Student.findOneAndDelete({ studentId });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(204).send('The student has been successfully deleted');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createStudent,
    readStudent,
    updateStudent,
    deleteStudent
}
