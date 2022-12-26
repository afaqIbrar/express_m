const Joi = require('joi');
const express = require('express');
const { func } = require('joi');
const app = express();
app.use(express.json());


const genres = [
    {id: 1 , name: 'Action'},
    {id: 2 , name: 'Thriller'},
    {id: 3 , name: 'Horror'},
    {id: 4 , name: 'Science Fiction'},
];
app.get('/' , (req,res) => {
    res.send("root route");
});
app.get('/api/genres' , (req,res) => {
    res.send(genres);
});
app.get('/api/genres/:id' , (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send('The genre with the given id is not available in the list...');
    res.send(genre);
});
app.post('/api/genres/' , (req,res) => {
    var {error} = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    }
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id' ,  (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with given id is not in the system...');
    var {error} = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with given id is not in the system...');
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});


function validateInput(inp) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(inp);
}



const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Listening on port ${port}...`);
});