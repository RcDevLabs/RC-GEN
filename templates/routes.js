var express = require('express');
var router = express.Router();
var {modelName} = require('./index');


router.get('/', {modelName}.list);

router.get('/:id', {modelName}.read);

router.post('/', {modelName}.create);

router.put('/:id', {modelName}.update);

router.delete('/:id', {modelName}.delete);

module.exports = router;