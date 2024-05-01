const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = 3000
app.use(express.json())

mongoose.connect('mongodb+srv://williamcs1400:<password>@delorian.3msstq1.mongodb.net/?retryWrites=true&w=majority&appName=delorian')
const Movie = mongoose.model('Movie', { name: String, year: Number, synopsis: String, comment: String, image: String })


app.post('/api/add-movie', async (req, res) => {
    const { name, year, synopsis, comment, image } = req.body

    const movie = new Movie({ name, year, synopsis, comment, image })
    await movie.save()
    console.log('Movie created: ' + movie)

    res.json(movie)
})

app.get('/api/movies', async (req, res) => {
    const movies = await Movie.find()
    console.log('Movies found: ' + movies)
    res.json(movies)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})