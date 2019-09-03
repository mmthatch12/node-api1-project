// implement your API here
const express = require('express')

const data = require('./data/db')

const server = express()

server.use(express.json())

server.post('/data', (req, res) => {
    const dataInfor = req.body
    console.log('data from body', dataInfor)
    data.insert(dataInfor)
        .then(dat => {
            res.status(201).json(hub)
        })
    .catch(error => {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})
