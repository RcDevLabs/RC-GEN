var model = require('../model.js');
module.exports = function(req, res) {
        var id = req.params.id;
        model.findByIdAndRemove(id, function(err, {name}){
            if(err) {
                return res.json({
                    msg: 'error',
                    errors: ['Error getting {name}.', err]
                });
            }
            return res.json({
                data: {name}
             });
        });
    };