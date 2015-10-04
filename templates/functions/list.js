var model = require('../model.js');

var list = function(req, res) {
	model.find(function(err, {pluralName}){
		if(err) {
			return res.json({
				msg: 'error',
				errors: ['Error getting {name}.', err]
			});
		}
		return res.json({
					msg: 'ok',
					data: {pluralName}
					});
	});
};

module.exports = list;