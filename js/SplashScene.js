var SplashScene = function () {
    'use strict';
    var my
    console.log("Scene Splash created");
    my = new createjs.Container();
    my.name='Splash';
    my.button=new Button("Start Game", Game.nextScene)
    my.addChild(my.button)
    var t = new createjs.Bitmap(Preloader.queue.getResult('img/splash.jpg'));
    my.addChild(t);
    t.x=(Game.width/2)-240;
    t.y=(Game.height/2)-180;
    //TODO den her meode bruges, men er mærkelig, nogen årsag?
    my.addToStage=function(parent){
        parent.addChild(my)
        return this;
    }
    return my;
};