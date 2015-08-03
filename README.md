# rc-gen

It’s a mongoose model, REST controller and Express router code generator for Express.js 4 application. FORKED FROM `express-mongoose-generator`

It will generate the following structure:

```
modelName/index.js  //model routes
modelName/model.js //model with Schema()
modelName/functions/controller.js //list+crud functions
```

## Installation

To run this, clone the repo to some folder. Access it and run `npm install -g`

#### Or just install directly from this Repo!!

```bash
$ npm install -g https://github.com/RcDevLabs/RC-GEN.git
```

## Usage

TD;DR: `$ rc-gen` 

²

### Non-Interactive mode
Generates a Mongoose model, a REST controller and Express router :
```bash
$ rc-gen -m card -f carDoor:number,color -r
        create: ./card/model.js //mongoose Schema
        create: ./card/index.js // routes
        create: ./card/functions/controller.js // controller
```

##### Options

  - `-m, --model <modelName>` - the model name.
  - `-f, --fields  <fields>` - the fields (name1:type,name2:type).
  - `-r, --rest` - enable generation REST.

##### Available types
  - string
  - number
  - date
  - boolean
  - array

### Interactive mode

Generates a Mongoose model, a REST controller and Express router :
```bash
$ rc-gen
Model Name : card
Available types : string, number, date, boolean, array
Field Name (press <return> to stop adding fields) : door
Field Type [string] : number
Field Name (press <return> to stop adding fields) : color
Field Type [string] : 
Field Name (press <return> to stop adding fields) : 
Generate Rest (yes/no) ? [yes] : 
        create: ./card/model.js
        create: ./card/index.js
        create: ./card/functions/controller.js
```

## Rendering
### Model
modelName/model.js :
```javascript
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({
	"color" : String,
	"door" : Number
});

module.exports = mongoose.model('car', carSchema);
```

### Router
modelName/index.js :
```javascript
var express = require('express');
var router = express.Router();
var controller = require('functions/controller.js');

/*
 * GET
 */
router.get('/', function(req, res) {
    controller.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function(req, res) {
    controller.show(req, res);
});

/*
 * POST
 */
router.post('/', function(req, res) {
    controller.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function(req, res) {
    controller.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function(req, res) {
    controller.remove(req, res);
});

module.exports = router;
```

### Controller
modelName/functions/controller.js :
```javascript
var model = require('../model.js');

/**
 * carController.js
 *
 * @description :: Server-side logic for managing cars.
 */
module.exports = {

    /**
     * carController.list()
     */
    list: function(req, res) {
        model.find(function(err, cars){
            if(err) {
                return res.json(500, {
                    message: 'Error getting car.'
                });
            }
            return res.json(cars);
        });
    },

    /**
     * carController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        model.findOne({_id: id}, function(err, car){
            if(err) {
                return res.json(500, {
                    message: 'Error getting car.'
                });
            }
            if(!car) {
                return res.json(404, {
                    message: 'No such car'
                });
            }
            return res.json(car);
        });
    },

    /**
     * carController.create()
     */
    create: function(req, res) {
        var car = new model({
			color : req.body.color,
			door : req.body.door
        });

        car.save(function(err, car){
            if(err) {
                return res.json(500, {
                    message: 'Error saving car',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: car._id
            });
        });
    },

    /**
     * carController.update()
     */
    update: function(req, res) {
        var id = req.params.id;
        model.findOne({_id: id}, function(err, car){
            if(err) {
                return res.json(500, {
                    message: 'Error saving car',
                    error: err
                });
            }
            if(!car) {
                return res.json(404, {
                    message: 'No such car'
                });
            }

            car.color =  req.body.color ? req.body.color : car.color;
			car.door =  req.body.door ? req.body.door : car.door;
			
            car.save(function(err, car){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting car.'
                    });
                }
                if(!car) {
                    return res.json(404, {
                        message: 'No such car'
                    });
                }
                return res.json(car);
            });
        });
    },

    /**
     * carController.remove()
     */
    remove: function(req, res) {
        var id = req.params.id;
        model.findByIdAndRemove(id, function(err, car){
            if(err) {
                return res.json(500, {
                    message: 'Error getting car.'
                });
            }
            return res.json(car);
        });
    }
};
```

You then only have to add router in app.js file and MongoDB connection whit Mongoose.
app.js :
```javascript
var routes = require('./routes/index');
var cards = require('../logic/cards'); //gets index.js
 ...

app.use('/', routes);
app.use('/cards', cards);
 ...
 
```

## Licence

Copyright (c) 2014 Damien Perrier
Licensed under the [MIT license](LICENSE).
