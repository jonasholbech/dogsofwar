"use strict";
(function() {
    function VictoryScene() {
        this.initialize();
        this.victoryText = new createjs.Text("VICTORY!!!", "30px Verdana", "#FFF");
        this.addChild(this.victoryText);

        this.footKills = new createjs.Text("", "30px Verdana", "#FFF");
        this.addChild(this.footKills);
        this.footKills.y=100;
        this.tankKills = new createjs.Text("", "30px Verdana", "#FFF");
        this.addChild(this.tankKills);
        this.tankKills.y=200;
        this.helicopterKills = new createjs.Text("", "30px Verdana", "#FFF");
        this.addChild(this.helicopterKills);
        this.helicopterKills.y=300;

        this.b = new Button("Onwards!", this.onwards, this)
        this.b.y=400;
        this.addChild(this.b)
    }
    VictoryScene.prototype = new createjs.Container();
    //Save a reference to the parent constructor
    VictoryScene.prototype.Parent_constructor = VictoryScene.prototype.initialize;

    VictoryScene.prototype.initialize=function(){
        //call parent constructor
        this.Parent_constructor();
        //continue with own constructor
        console.log("Victory Scene constructed");


    }
    VictoryScene.prototype.setup=function(){
        this.footKills.x=this.tankKills.x=this.helicopterKills.x=0;
        this.footKills.y=100;
        this.tankKills.y=200;
        this.helicopterKills.y=300;
        this.footKills.text="Foot Soldiers: "+dirtyStorage.foot + " = $"+(dirtyStorage.foot*1);
        this.tankKills.text="Tanks: "+dirtyStorage.tank + " = $"+(dirtyStorage.tank*10);
        this.helicopterKills.text="Helicopters: "+dirtyStorage.helicopter + " = $"+(dirtyStorage.helicopter*100);

    }
    VictoryScene.prototype.onwards=function(){
        Player.cash+=dirtyStorage.foot;
        Player.cash+=dirtyStorage.tank*10;
        Player.cash+=dirtyStorage.helicopter*100;

        createjs.Tween.get(this.footKills).to({x:700, y:-100}, 400);
        createjs.Tween.get(this.tankKills).wait(400).to({x:700, y:-100}, 400);
        createjs.Tween.get(this.helicopterKills).wait(800).to({x:700, y:-100}, 400).call(function(){
            //TODO sætter nyt index inden den anden fjernes, set scene skal ordne det hele tror jeg
            Game.clearScene();
            Game.setScene("Mission Select")
            Game.nextScene();
        });

    }

    //add it to the global namespace
    window.VictoryScene = VictoryScene;
}());