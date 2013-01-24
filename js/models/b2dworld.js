var app = app || {};
app.models = app.models || {};

(function (){
'use strict';

app.models.B2DWorld = Backbone.Model.extend({
    defaults: {
        worldtype: 'b2d',
        positions: {}
    },
    init: function (){
        // init box2d
        var b2World = Box2D.Dynamics.b2World,
            b2Vec2 = Box2D.Common.Math.b2Vec2;
        // creating world
        this.world = new b2World(
            new b2Vec2(this.get('gravity_x') , this.get('gravity_y'))    //gravity
            , false                 //allow sleep
        );

        this.set('positions', {});
        this.last_render_time = 0;
    },

    destroy: function (){
        //remove!!! all the objects
        this.set('positions', {});
        this.world = null;
    },
    update: function(){
        var b,
            world = this.world,
            positions = {},
            render_time = new Date().getTime() / 1000,
            stepRate = this.last_render_time && render_time - this.last_render_time ||  1 / 60;

        this.last_render_time = render_time;

        world.Step(stepRate, 10, 10);
        world.ClearForces();    

        for (b = world.GetBodyList(); b; b = b.m_next) {
            if (b.IsActive() && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
                positions[b.GetUserData()] = {
                    x: b.GetPosition().x, 
                    y: b.GetPosition().y, 
                    angle: b.GetAngle(), 
                    center: {
                       x: b.GetWorldCenter().x, 
                       y: b.GetWorldCenter().y
                    }
                }
            }
        }
        this.set('positions', positions);

    }
//    validate: function (attributes){
//    }
});





}());
