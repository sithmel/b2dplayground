(function (plugins){

/*
*
* default World (do nothing)
*
*/


plugins.createWorld.add(function (model){
    return {
        name: model.get('name'),
        init: function (collection){
            var positions = {};
            this.collection = collection;
            this.collection.each(function (element, index){
                positions[element.id] = {
                    x: element.get('start_x'),
                    y: element.get('start_y'),
                    angle: element.get('start_angle')
                }
            });
            this.positions = positions;
        },
        destroy: function (){
        },
        update: function(stepRate){
            return this.positions;
        }
    };
}, plugins.validators.isAnything);


plugins.worlds.add(function (){
    return {
        name: 'staticworld'
    }
});

}(window.B2DPLAYGROUND.plugins));

