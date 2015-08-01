/**
 * Module dependencies
 */
var ft = require('./fileTools');
var formatTools = require('./formatTools');

/**
 * Generate a Mongoose model
 * @param path {string}
 * @param modelName {string}
 * @param modelFields {array}
 */
function generateModel(path, modelName, modelFields){
    ft.createDirIfIsNotDefined(path, modelName, function () {
        var fields = formatTools.getFieldsForModelTemplate(modelFields);
        var schemaName = modelName + 'Schema';

        var model = ft.loadTemplateSync('model.js');
        model = model.replace(/{modelName}/, modelName);
        model = model.replace(/{schemaName}/g, schemaName);
        model = model.replace(/{fields}/, fields );

        ft.writeFile(path + '/' + modelName + '/model.js', model);
    });
}

/**
 * Generate a Express router
 * @param path {string}
 * @param modelName {string}
 */
function generateRouter(path, modelName){
    ft.createDirIfIsNotDefined(path, modelName, function () {
        var router = ft.loadTemplateSync('router.js');
        router = router.replace(/{controllerName}/, modelName + 'Controller');

        ft.writeFile(path + '/' + modelName + '/index.js', router);
    });
}

/**
 * Generate Controller
 * @param path {string}
 * @param modelName {string}
 * @param modelFields {array}
 */
function generateController(path, modelName, modelFields){
    ft.createDirIfIsNotDefined(path, modelName+'/functions', function () {
        var controller = ft.loadTemplateSync('controller.js');

        var updateFields = '';
        var createFields = '\r';
        modelFields.forEach(function(f, index, fields){
            var field = f.name;

            updateFields += modelName + '.' + field + ' =  req.body.' + field + ' ? req.body.' + field + ' : ' + modelName + '.' + field + ';';
            updateFields += '\r\t\t\t';

            createFields += '\t\t\t' + field + ' : req.body.' + field;
            createFields += ((fields.length - 1) > index) ? ',\r' : '\r';
        });

        controller = controller.replace(/{modelName}/g, modelName + 'Model');
        controller = controller.replace(/{name}/g, modelName);
        controller = controller.replace(/{pluralName}/g, formatTools.pluralize(modelName));
        controller = controller.replace(/{controllerName}/g, modelName + 'Controller');
        controller = controller.replace(/{createFields}/g, createFields);
        controller = controller.replace(/{updateFields}/g, updateFields);

        ft.writeFile(path + '/'+modelName+'/functions/controller.js', controller);
    });
}

module.exports = {
    generateModel: generateModel,
    generateRouter: generateRouter,
    generateController: generateController
};