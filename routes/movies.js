const { Movie, validate } = require('../models/movies');
const { Genre } = require ('../models/genre');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async(req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id' ,async (req,res) => {
    const movies = await Movie.findById(req.params.id);
    if(!movies) return res.status(400).send('The movie with the given id is not available in the list...');
    res.send(movies);
});

router.post('/' , async (req , res) => {
    var {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
});

router.put('/:id' , async (req,res) => {
    var {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const movie = await Movie.findByIdAndUpdate(req.params.id , { title: req.body.title , numberInStock:req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate } , { new : true});
    if(!movie) return res.status(404).send('The movie with given id is not in the system...');
    res.send(movie);
});

router.delete('/:id', async (req,res) => {
    const movies = await Movie.findByIdAndRemove(req.params.id);
    if(!movies) return res.status(404).send('The movie with given id is not in the system...');
    res.send(movies);
});

module.exports = router;