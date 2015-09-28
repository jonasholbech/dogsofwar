"use strict";
var Tick = {
    tock:function(e){
        //TODO pause
        if(Game.inBattle){
            Game.scenes[Game.currentScene].tick();
            Player.tick();
        }
        Game.stage.update(e);

    }
}