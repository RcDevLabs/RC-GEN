var model = require('../model.js');

module.exports = {

    list: function(req, res) {
        model.find(function(err, {pluralName}){
            if(err) {
                return res.json(500, {
                    message: 'Error getting {name}.'
                });
            }
            return res.json({pluralName});
        });
    },

    show: function(req, res) {
        var id = req.params.id;
        model.findOne({_id: id}, function(err, {name}){
            if(err) {
                return res.json(500, {
                    message: 'Error getting {name}.'
                });
            }
            if(!{name}) {
                return res.json(404, {
                    message: 'No such {name}'
                });
            }
            return res.json({name});
        });
    },

    create: function(req, res) {
        var {name} = new model({{createFields}
        });

        {name}.save(function(err, {name}){
            if(err) {
                return res.json(500, {
                    message: 'Error saving {name}',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: {name}._id
            });
        });
    },

    update: function(req, res) {
        var id = req.params.id;
        model.findOne({_id: id}, function(err, {name}){
            if(err) {
                return res.json(500, {
                    message: 'Error saving {name}',
                    error: err
                });
            }
            if(!{name}) {
                return res.json(404, {
                    message: 'No such {name}'
                });
            }

            {updateFields}
            {name}.save(function(err, {name}){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting {name}.'
                    });
                }
                if(!{name}) {
                    return res.json(404, {
                        message: 'No such {name}'
                    });
                }
                return res.json({name});
            });
        });
    },

    remove: function(req, res) {
        var id = req.params.id;
        model.findByIdAndRemove(id, function(err, {name}){
            if(err) {
                return res.json(500, {
                    message: 'Error getting {name}.'
                });
            }
            return res.json({name});
        });
    }
};