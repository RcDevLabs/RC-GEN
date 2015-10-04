var model = require('../model.js');

module.exports = function(req, res) {
    var {name} = new model({
        {createFields}
    });

    {name}.save(function(err, {name}){
        if(err) {
            return res.json(500, {
                msg: 'error',
                errors: ['Erro ao salvar {name}', err]
            });
        }
        return res.json({
            msg: 'ok',
            data: {name}
        });
    });
};