(function (plugins){

plugins.validators.isB2DWorld = occamsrazor.validator(plugins.validators.isAnything, function (obj){
    return obj.name === 'box2d';
});

plugins.validators.isB2DWorldModel = occamsrazor.validator(plugins.validators.isAnything, function (model){
    return model.get('name') === 'box2d';
});

plugins.createWorld.add(function (model){
    return {
        name: model.get('name'),
        init: function (collection){
            // init box2d
            var b2World = Box2D.Dynamics.b2World,
                b2Vec2 = Box2D.Common.Math.b2Vec2,
                that = this;

            // creating world
            this.world = new b2World(
                new b2Vec2(model.get('gravity_x') , model.get('gravity_y'))    //gravity
                , false                 //allow sleep
            );
            
            // load objects
            collection.each(function (element, index){
                plugins.addToWorld(element, that);
            });
        },
        destroy: function (){
            delete this.world;
        },
        update: function(stepRate){
            var b,
                world = this.world,
                positions = {};

            world.Step(stepRate, 10, 10);
            world.ClearForces();    

            for (var b = world.GetBodyList(); b; b = b.m_next) {
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
            return positions;
        }
    };
}, plugins.validators.isB2DWorldModel);

plugins.worlds.add(function (){
    return {
        name: 'box2d',
        gravity_x: 0,
        gravity_y: 10
    }
});

}(window.B2DPLAYGROUND.plugins));

