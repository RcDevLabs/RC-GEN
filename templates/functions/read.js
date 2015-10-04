var model = require('../model.js');
module.exports = function(req, res) {
	var id = req.params.id;
	model.findOne({_id: id}, function(err, {name}){
		if(err) {
			return res.json({
				msg: 'error',
				errors: ['Error getting {name}.', err]
			});
		}
		if(!{name}) {
			return res.json({
				msg: 'error',
				errors: ['No such {name}', 404]
			});
		}
		return res.json({
			msg: 'ok',
			data:	{name}
		});
	});
};