Box2D Playground
================
This is a simple demo that one day should become a sort of a game engine.
I wrote this to demostrate how to use occamsrazor.js with backbone.js.


Features to add
===============
- the canvaslayer should be a "window" on a more bigger world

    It should manage both real and virtual size and an offset
    It should been possible to manage scrolling

- new background "body" plugin

    This is a kind of object with its own "world"
    It should be possible to manage parallax

- manage resources with a resource loader

    Look at: (http://code.google.com/p/canvg/, http://www.schillmania.com/projects/soundmanager2/, http://thinkpixellab.com/pxloader/)
    
    It would be awesome with artworks taken from one or more svg.
    They should be copied inside an offscreen canvas (managing the appropriate resolution).

- manage user controlled objects

- manage collisions

- manage sprites

    Watch this: http://buildnewgames.com/2d-platformer-character-movement/

- manage particles effects (integrate an external library)

Features to refactor
====================
- in object transformation

    Each object must take care of its own position inside the canvas
    Currently this is managed in the view

- object events

    the bodies view must trigger custom events to the "object world" 

- replace backbone.js with occamsrazor.framework.js

- each plugin must have its namespace (this can help to avoid conflicts)

- load resources with require.js

