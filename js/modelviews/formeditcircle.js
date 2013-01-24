(function (){
'use strict';

var FormEditCircle = app.views.FormEdit.extend({
    template: _.template('<h4><%-shape%></h4>'+
    '<div class="control-group">' + 
    '<label class="control-label">Radius:' + 
    '</label>'+
    '<div class="control">' + 
    '<input name="radius" data-type="float" class="radius input-mini" type="range" min="0.1" max="4" step="0.05" value="<%-radius%>"/>' +
    '</div>'+
    '</div>'+
    '<div class="control-group">' + 
    '<label class="control-label">Color:' + 
    '</label>'+
    '<div class="control">' + 
    '<input name="color" data-type="string" class="color input-mini" value="<%-color%>"/>' + 
    '</div>'+
    '</div>'+
    '<div class="control-group">' + 
    '<label class="control-label">Static:' + 
    '</label>'+
    '<div class="control">' + 
    '<select name="is_static" data-type="boolean" class="is_static input-mini">'+
    '<option <% if (is_static) {%>selected="selected"<% } %> value="true">Yes</option>'+
    '<option <% if (!is_static) { %>selected="selected"<% } %> value="false">No</option>'+
    '</select>' +
    '</div>'+
    '</div>'+
    '<div class="control-group">' + 
    '<label class="control-label">X:' + 
    '</label>'+
    '<div class="control">' + 
    '<input name="start_x" data-type="float" class="start_x input-mini" type="range" min="1" max="30" step="0.01" value="<%-start_x%>"/>' + 
    '</div>'+
    '</div>'+
    '<div class="control-group">' + 
    '<label class="control-label">Y:' +
    '</label>'+
    '<div class="control">' + 
    '<input name="start_y" data-type="float" class="start_y input-mini" type="range" min="1" max="30" step="0.01" value="<%-start_y%>"/>' + 
    '</div>'+
    '</div>'+
    '<input type="button" class="delete btn btn-danger" value="delete"/>')
});

app.views.formedit.itemView.addConstructor([null, app.validators.is_circle], FormEditCircle);


}());
