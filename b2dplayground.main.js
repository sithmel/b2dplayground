/*
declare main namespace
*/

(function (){

// main
window.B2DPLAYGROUND = {};

// utilities
window.B2DPLAYGROUND.utilities = {};

// models
window.B2DPLAYGROUND.models = {};


// plugins
window.B2DPLAYGROUND.plugins = {};


window.B2DPLAYGROUND.plugins.shapes = occamsrazor();
window.B2DPLAYGROUND.plugins.editor = occamsrazor();
window.B2DPLAYGROUND.plugins.drawer = occamsrazor();

window.B2DPLAYGROUND.plugins.worlds = occamsrazor();

window.B2DPLAYGROUND.plugins.createWorld = occamsrazor();
window.B2DPLAYGROUND.plugins.addToWorld = occamsrazor();

window.B2DPLAYGROUND.plugins.validators = {};

window.B2DPLAYGROUND.plugins.validators.isAnything = occamsrazor.validator(function (){
    return true;
});

}());

