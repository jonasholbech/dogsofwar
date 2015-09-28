var MissionSelectScene = function (data) {
    'use strict';
    var my
    console.log("Scene Mission Select created");
    my = new createjs.Container();
    my.name='Mission Select';

    //5 times per second
    Game.stage.enableMouseOver(5);//TODO, tjek at det ikke piller ved andre scenes når den her scene er inactive (disable on hide something)

    //TODO hover virker kun første gang
    my.setup=function(){
        document.querySelector("canvas").style.backgroundColor="#6495ED";
        var gfx = new createjs.Bitmap(Preloader.queue.getResult('img/European_map.png'));
        my.addChild(gfx);
        var t, i;
        for(i =0; i<data.levels.length; i++){
            t = new MissionButton(
                data.levels[i].name + ": $" + data.levels[i].reward,
                Game.missionSelected,
                Game,
                data.levels[i].completed);
            t.on("mouseover", t.handleMouseEvent);
            t.on("mouseout", t.handleMouseEvent);
            if(data.levels[i].completed) {
                t.toggle();
            }
            t.countryIndex=i;
            my.addChild(t)
            t.x=data.levels[i].position.x;
            t.y=data.levels[i].position.y;
        }
    }

    my.close=function(){
        Game.stage.enableMouseOver(0);//remove hover events
        document.querySelector("canvas").style.backgroundColor="#ccc";
    }
    my.clear=function(){
        my.removeAllChildren();
    }
    return my;
};