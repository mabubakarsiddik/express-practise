const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

const getDbStudents = () => {
    return new Promise((resolve, rejects) => {
        fs.readFile('./db.json', 'utf-8', (err, data) => {
            const students = JSON.parse(data);
            resolve(students);
        })
    })
}

const insertDbStudents = (students) => {
    return new Promise((resolve, rejects) => {
        fs.writeFile('./db.json', JSON.stringify(students), (err) => {
            resolve('well done!, posted')
        })
    })
}

module.exports.getDbStudents = getDbStudents;
module.exports.insertDbStudents = insertDbStudents;