import Express from 'express'

const app = Express()

app.get('/', (req, res, next) => {
    res.send('Helooo')
})

app.listen(3001)

module.exports = app