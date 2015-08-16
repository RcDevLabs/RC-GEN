var model = require('../model.js');

module.exports = function(req, res) {
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
};