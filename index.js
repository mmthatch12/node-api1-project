// implement your API here
const express = require('express')

const data = require('./data/db')

const server = express()

server.use(express.json())

server.post('/api/users', (req, res) => {
    const dataInfor = req.body
    console.log('data from body', dataInfor)
    data.insert(dataInfor)
        .then(dat => {
            res.status(201).json(dat)
        })
    .catch(error => {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})

server.get('/api/users', (req, res) => {
    data.find()
        .then(dat => {
            res.status(200).json(dat)
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    data.findById(userId)
        .then(dat => {
            res.status(200).json(dat)
        })
        .catch(error => {
            res.status(404).json({ error: "The user with the specified ID does not exist." })
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    data.remove(userId)
        .then(dat => {
            res.status(200).json(dat)
        })
        .catch(error => {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" })
        })
})

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const changes = req.body

    data.update(userId, changes)
        .then(up => {
            if(up) {
                res.status(200).json(up)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            
        })
        .catch(error => {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
})
    

const port = 8000
server.listen(port, () => console.log('api running'))
