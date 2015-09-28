var MissionSelectScene = function (data) {
    'use strict';
    var my
    console.log("Scene Mission Select created");
    my = new createjs.Container();
    my.name='Mission Select';

    //5 times per second
    Game.stage.enableMouseOver(5);//TODO, tjek at det ikke piller ved andre scenes når den her scene er inactive (disable on hide something)


    my.setup=function(){
        document.querySelector("canvas").style.backgroundColor="#6495ED";
        var gfx = new createjs.Bitmap(Preloader.queue.getResult('img/European_map.png'));
        my.addChild(gfx);
        var t, i;
        for(i =0; i<data.levels.length; i++){
            t = new MissionButton(data.levels[i].name + ": $" + data.levels[i].reward, Game.missionSelected);
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
/*
function init() {
    stage = new createjs.Stage("demoCanvas");

    // to get onMouseOver & onMouseOut events, we need to enable them on the stage:
    stage.enableMouseOver();

    output = new createjs.Text("Test press, click, doubleclick, mouseover, and mouseout", "14px Arial");
    output.x = output.y = 10;
    stage.addChild(output);

    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    circle.x = circle.y = 100;
    circle.name = "circle";
    stage.addChild(circle);

    var square = new createjs.Shape();
    square.graphics.beginFill("green").drawRect(-50, -50, 100, 100);
    square.x = 250;
    square.y = 100;
    square.name = "square";
    stage.addChild(square);

    // add a handler for all the events we're interested in:
    circle.on("click", handleMouseEvent);
    circle.on("dblclick", handleMouseEvent);
    circle.on("mouseover", handleMouseEvent);
    circle.on("mouseout", handleMouseEvent);

    square.on("click", handleMouseEvent);
    square.on("dblclick", handleMouseEvent);
    square.on("mouseover", handleMouseEvent);
    square.on("mouseout", handleMouseEvent);

    stage.update();
}

function handleMouseEvent(evt) {
    output.text = "evt.target: "+evt.target+", evt.type: "+evt.type;

    // to save CPU, we're only updating when we need to, instead of on a tick:1
    stage.update();
}*/