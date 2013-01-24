var app = app || {};
app.models = app.models || {};
app.validators = app.validators || {};

(function (){
'use strict';

app.validators.is_box = occamsrazor.chain(app.validators.is_body, function (obj){
    if (obj instanceof Backbone.Model){
        return obj.get('shape') === 'box';
    }
    return obj.shape === 'box';
});

app.models.Box = app.models.GenericBody.extend({
//    defaults: {
//    },
//    initialize: function (){
//    },
//    validate: function (attributes){
//    }
});

app.collections.bodies.model.addConstructor(app.validators.is_box, app.models.Box);

}());
