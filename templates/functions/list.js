var model = require('../model.js');

var list = function(req, res) {
	model.find(function(err, {pluralName}){
		if(err) {
			return res.json(500, {
				message: 'Error getting {name}.'
			});
		}
		return res.json({pluralName});
	});
};

module.exports = list;