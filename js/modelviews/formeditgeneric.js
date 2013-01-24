(function (){
'use strict';

app.views.FormEdit = Backbone.Occamsrazor.ItemView.extend({
    className: "form-horizontal",
    events: {
        "click .delete":    "del",
        "change": "edit"
    },
    initialize: function (options, model){
        var that = this;
        Backbone.Occamsrazor.ItemView.prototype.initialize.call(this, options, model)
        this.listenTo(this.model, 'click', function (evt){
            that.$el.parent().children().removeClass('selected');
            that.$el.addClass('selected');
        });
        this.listenTo(this.model, 'change', this.render);
    },
    render: function(model, options){
        var html,
            from_self = options && options.from_self || false;
        if (from_self){
            return this;
        }
        html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    },
    del: function (){
        this.model.destroy();
    },
    edit: function (){
        var name,
            obj = app.utilities.form2obj(this.$el);
        for (name in obj){
            this.model.set(name, obj[name], {from_self: true});
        }

        this.model.save();
    }

});

}());
