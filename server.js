const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const config = require('./config');

const Item = require('./models/item');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

app.get('/items',(req, res) => {
    Item.find() 
        .then(items => {
            res.json(items);
        })
        .catch(items => {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });    
    });


app.post('/items', (req, res) => {
    Item.create({name: req.body.name})
    .then(item => {
        return res.status(201).json(item);
    })
    .catch(err => {
        return res.status(500).json({
                message: 'Internal Server Error'
        });        
    });
});

app.delete('/items/:id',(req, res) => {
    Item.findOneAndRemove({_id: req.params.id})
        .then(item => {
            return res.status(200).json(item);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Internal Server Error'
        });
   });
});


app.put('/items/:id',(req, res) => {
  Item.update({_id: req.params.id}, {name: req.body.name}) 
        .then(item => {
            return res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).json(err);
        });
  });


app.use('*',(req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
