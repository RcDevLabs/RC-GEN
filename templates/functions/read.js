var model = require('../model.js');
module.exports = function(req, res) {
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
};