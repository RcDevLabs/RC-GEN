/**
 * Module dependencies
 */
var ft = require('./fileTools');
var formatTools = require('./formatTools');

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

function generateRouter(path, modelName){
    ft.createDirIfIsNotDefined(path, modelName, function () {
        var routes = ft.loadTemplateSync('routes.js');
        routes = routes.replace(/{modelName}/g, modelName);
        ft.writeFile(path + '/' + modelName + '/routes.js', routes);
    });
}

function generateIndex(path, modelName){
    console.log("Lets generate the index for ", modelName);
    
    ft.createDirIfIsNotDefined(path, modelName, function () {
        var index = ft.loadTemplateSync('index.js');
        index = index.replace(/{modelName}/, modelName);

        ft.writeFile(path + '/' + modelName + '/index.js', index);
    });
}


function generateController(path, modelName, modelFields){
    ft.createDirIfIsNotDefined(path, modelName+'/functions', function () {

        var updateFields = '';
        var createFields = '\r';
        modelFields.forEach(function(f, index, fields){
            var field = f.name;

            updateFields += modelName + '.' + field + ' =  req.body.' + field + ' ? req.body.' + field + ' : ' + modelName + '.' + field + ';';
            updateFields += '\r\t\t\t';

            createFields += '\t\t\t' + field + ' : req.body.' + field;
            createFields += ((fields.length - 1) > index) ? ',\r' : '\r';
        });

        var functions = ['list', 'create', 'read','update','delete'];
        functions.forEach(function(f){
            var template = ft.loadTemplateSync('./functions/'+f+'.js');
            template = template.replace(/{modelName}/g, modelName + 'Model');
            template = template.replace(/{name}/g, modelName);
            template = template.replace(/{pluralName}/g, formatTools.pluralize(modelName));
            template = template.replace(/{controllerName}/g, modelName + 'Controller');
            template = template.replace(/{createFields}/g, createFields);
            template = template.replace(/{updateFields}/g, updateFields);
            ft.writeFile(path + '/'+modelName+'/functions/'+f+'.js', template);
        });

        // var controller = ft.loadTemplateSync('controller.js');
        // controller = controller.replace(/{modelName}/g, modelName + 'Model');
        // controller = controller.replace(/{name}/g, modelName);
        // controller = controller.replace(/{pluralName}/g, formatTools.pluralize(modelName));
        // controller = controller.replace(/{controllerName}/g, modelName + 'Controller');
        // controller = controller.replace(/{createFields}/g, createFields);
        // controller = controller.replace(/{updateFields}/g, updateFields);
        // ft.writeFile(path + '/'+modelName+'/functions/controller.js', controller);

    });
}

module.exports = {
    generateModel: generateModel,
    generateRouter: generateRouter,
    generateController: generateController,
    generateIndex: generateIndex
};