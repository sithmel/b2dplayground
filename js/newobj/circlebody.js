var app = app || {};
app.newobj = app.newobj || {};
app.newobj.BodyPlugins = app.newobj.BodyPlugins || occamsrazor();

(function (){
'use strict';

app.newobj.BodyPlugins.add(function (){
    return {
        shape:      'circle',
        radius:     1,
        color:      '#22EE33',
        is_static:   false,
        start_x:    3,
        start_y:    3,
        start_angle:0
    };
});

}());
