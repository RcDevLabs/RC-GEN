var model = require('../model.js');
module.exports = function(req, res) {
        var id = req.params.id;
        model.findByIdAndRemove(id, function(err, {name}){
            if(err) {
                return res.json(500, {
                    message: 'Error getting {name}.'
                });
            }
            return res.json({name});
        });
    };