var app = app || {};
app.models = app.models || {};
app.validators = app.validators || {};

(function (){
'use strict';

app.validators.is_body = function (obj){
    if (obj instanceof Backbone.Model){
        return obj.has('shape');
    }
    return 'shape' in obj;
};

app.models.GenericBody = Backbone.Model.extend({
//    defaults: {
//    },
//    validate: function (attributes){
//    }
});

app.collections.bodies.model.addConstructor(app.validators.is_body, app.models.GenericBody);

}());
