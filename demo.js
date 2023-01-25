// main.js

import { Sprite, Vector2 } from './modules/engine.js';

// import * as _ from './modules/engine.js';
import('./modules/engine.js')
.then( _ => {

    'use strict';

    const _Game = new _.Game();
    const mouse = _Game.mouse;
    const kb = _Game.kb;
    var cloud;

    var centerpoint;

    const debugConsole = document.createElement("div");
    debugConsole.style.zIndex = 1000;

    // stop arrow/space default behavior https://stackoverflow.com/a/8916697
    document.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);


    // user defined init function
    _Game.init =  function () {

        document.body.appendChild(debugConsole);

        centerpoint = new _.Vector2(_Game.width/2, _Game.height/2);

        var scene_fg = _Game.makeScene('fg').attach('demo');
        scene_fg.setZIndex(1);
        scene_fg.precision = 2;
		scene_fg.showDebug
        //scene_fg.hide();

		const CLOUD_WIDTH = 1134;
		const CLOUD_HEIGHT = 794;
		const CLOUD_SIZE_FACTOR = 0.25;

        cloud = new _.Sprite('img/Salesforce_Corporate_Logo_RGB.png', CLOUD_WIDTH * CLOUD_SIZE_FACTOR, CLOUD_HEIGHT * CLOUD_SIZE_FACTOR, scene_fg.width / 2, scene_fg.height / 2);
        cloud.setBoundAction(Sprite.BOUND_ACTION.BOUNCE);
		cloud.addForce(new Vector2(1, 0.5));

        scene_fg.addEntity(cloud);

        this.on('Collision', (...ev) => {
            console.log(ev);
        });

        this.on('KeyPressed', (...key) => {

            console.log(key);
        });

        this.on('MouseButton', (...btn) => {
            console.log(btn);
        });

        this.on('EntityMarkedForDelete', (...e) => {
            console.log(e);
        });
    }; // end init

    // user defined update function. main game loop
    _Game.update = function() {

        if (!this.isPaused) {

        } else {

        }

        // debugConsole.innerText = `frametime: ${_.Time.delta} ms\n`;
        // debugConsole.innerText += `FPS: ${parseInt(1000 / _.Time.delta)}`;
    }

    // call Game.start() to begin
    _Game.start();  // <-------------------- Don't forget to call start!
    //_Game.stop();
})
.catch((err) => {
    console.log(err);
});
