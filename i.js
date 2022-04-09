const express = require('express');
const res = require('express/lib/response');
const app = express();
const fs = require('fs');
const { resolve } = require('path');
const db = require('./db')

app.use(express.json());

app.get('/api/students/:id', (req, res) => {
    const stdId = parseInt(req.params.id);
    db.getDbStudents()
    .then(students => {
        const oneStd = students.find(std => std.id === stdId);
        if(!oneStd) {
            res.status(404);
            res.send('no data founddds');
        } else {
            res.send(oneStd);
        }
    })
});
app.post('/api/students', (req, res) => {
    const student = req.body;
    db.getDbStudents()
    .then(students => {
        students.push(student);
        fs.writeFile('./db.json', JSON.stringify(students), (err) => {
            res.send(student)
        })
    })
});
app.post('/user/id', (req, res) => {
    const user = req.body;
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        const users =  JSON.parse(data);
        users.students.push(user);
        fs.writeFile('./db.json', JSON.stringify(users), (err) => {
            res.send(user);
        });
    });
});
app.post('/new/customer', (req, res) => {
    const customer = req.body;
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        const customers = JSON.parse(data);
        customers.students.push(customer);
        fs.writeFile('./db.json', JSON.stringify(customers), (err) => {
            res.send(customer)
        })
    })
})
app.get('/new/customer', (req, res) => {
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        const customer = JSON.parse(data).students
        res.send(customer);
    })
})
app.get('/new/custom/:id', (req, res) => {
    const customId = parseInt(req.params.id);
    db.getDbStudents()
        .then(students => {
            const oneCustom = students.find(cId => cId.id === customId);
            if (!customId) {
                res.status(404).send('non of custom id')
            } else{
                res.send(oneCustom)
            }
        })
})

app.post('/insert/new', (req, res) => {
    const newInsert = req.body;
    db.getDbStudents()
        .then(students => {
            students.push(newInsert);
            db.insertDbStudents(students)
                .then()
                res.send(newInsert)
        })
})

app.put('/insert/new/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedNew = req.body;
    db.getDbStudents()
        .then(students => {
            const std = students.find(nId => nId.id === id);
            if(!std) {
                res.status(404).send('not mached ID')
            } else{
                const i = students.findIndex(s => s.id === id);
                students[i] = updatedNew;
                db.insertDbStudents(students)
                    .then(msg => res.send(updatedNew))
            }
        })
})

app.put('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const upId = req.body;
    db.getDbStudents()
        .then(students => {
            const newId = students.find(fId => fId.id ===id);
            if(!newId) {
                res.status(404).send('not found id');
            } else {
                const i = students.findIndex(fi => fi.id === id);
                students[i] = upId;
                db.insertDbStudents(students)
                    .then(msg => res.send(upId))
            }
        })
})

app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.getDbStudents()
        .then(students => {
            const findId = students.find(s => s.id === id)
            if(!findId) {
                res.status(404).send('non of existance');
            } else {
                const filteredId = students.filter(f => f.id !== id);
                db.insertDbStudents(filteredId)
                    .then(msg => res.send(findId))
            }
        })
})

app.listen(3000, () => {
    console.log('surver running on port 3000');
});
