import express from 'express'

const server = express()

server.get('/', (req, res) => {
    res.json({
        login: true,
    })
})

server.listen(4000, () => console.log('Gateway microservice is listening...'))
