const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my-students')
    .then(() => console.log('connected mongodb successfull'))
    .catch(err => console.error('connection failed'))
//Schema
const studentSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: String,
    dob: Date,
    passed: Boolean,
    hobbies: [String],
    parents: {
        father: String,
        mother: String
    },
    subject: [{name: String, marks: { type: Number, min: 0, max: 100}}]
});

//model
const Student = mongoose.model('Student', studentSchema);

async function createStudent() {
    const data = await Student.create({
        firstName: "Abir",
        lastName: "Uddin",
        dob: new Date("27 April 1995"),
        passed: true,
        hobbies: ["Sining", "Traveling"],
        parents: {
            father: "A",
            mother: "B"
        },
        subject: [{name: "math", marks: 80}, {name: "english", marks: 90}]
    })
    console.log(data)
}
createStudent()
