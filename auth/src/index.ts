import express from 'express'

const server = express()

server.get('/', (req, res) => {
    res.json({
        login: true,
    })
})

server.listen(4001, () => console.log('Auth microservice is listening...'))
