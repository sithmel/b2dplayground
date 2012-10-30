/*
utility module for b2dplayground
*/

(function (util){

/*
Rendering loop
*/

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

(function loop() {
    $(window).trigger('requestAnimEvent');
    requestAnimFrame(loop);
})();


// canvas layer

util.CanvasLayer = function(node, width, height, scale){
    this.canvas = node;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.canvas.height = this.height * scale;
    this.canvas.width = this.width * scale;
    this.ctx = this.canvas.getContext("2d");
    // this.offsetx = 0;
    // this.offsety = 0;
};

util.CanvasLayer.prototype.clear = function (){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

};

//
// Point
//

util.Point = function (x, y){
    this.x = x;
    this.y = y;
};

util.Point.prototype.rotate = function (angle){
    var x, y;
    x = this.x*Math.cos(angle) - this.y * Math.sin(angle);
    y = this.x*Math.sin(angle) + this.y * Math.cos(angle);
    this.x = x;
    this.y = y;
    return this;
};

util.Point.prototype.translate = function (x, y){
    this.x = this.x + x;
    this.y = this.y + y;
    return this;
};

util.Point.prototype.distanceFrom = function (x, y){
    var dx = this.x - x, 
        dy = this.y - y;
    return Math.sqrt(dx*dx + dy*dy);
};


/*
* form 2 object
*/

util.form2obj = function ($node){
    var converters = {}, obj= {},
        $inputs = $node.find(':input');
    
    converters.float = function (x){
        return parseFloat(x);
    };
    converters.string = function (x){
        return x;
    };
    converters.boolean = function (x){
        return x.toLowerCase() === 'true';
    };

    $inputs.each(function (){
        var $input = $(this),
            name = $input.attr('name'),
            data_converter = converters[$input.data('type')] || converters['string'];
            obj[name] = data_converter($input.val());
    });
    return obj;
};


}(window.B2DPLAYGROUND.utilities));

