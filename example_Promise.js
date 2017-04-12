//mongoose.Promise = global.Promise; app.js file


Item.create({name: req.body.name})
	.then(item => {
		return res.status(201).json(item);
	})
	.catch(err => {
		return res.status(500).json({
                message: 'Internal Server Error'
        });        
	});

Item.create({
        name: req.body.name
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });

