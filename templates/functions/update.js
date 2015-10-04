var model = require('../model.js');

module.exports = function(req, res) {
var id = req.params.id;
model.findOne({_id: id}, function(err, {name}){
    if(err) {
        return res.json({
            msg: 'error',
            errors: ['Error saving {name}', err]
        });
    }
    if(!{name}) {
        return res.json({
            msg: 'error',
            errors: ['No such {name}']
        });
    }

    {updateFields}
    {name}.save(function(err, {name}){
        if(err) {
            return res.json({
                msg: ['error'],
                errors: ['Error getting {name}.']
            });
        }
        if(!{name}) {
            return res.json({
                msg: 'error',
                errors: ['No such {name}']
            });
        }
        return res.json({
            msg:'ok',
            data: {name}
            });
    });
});
};