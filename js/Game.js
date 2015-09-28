"use strict";
var dirtyStorage={}
var Game={
    stage:null,
    scenes:[],
    currentScene:null,
    loader:null,
    levelData:null,
    currentMission:null,
    inBattle:false,
    init:function(){
        console.log("Game initialized");
        this.stage = new createjs.Stage("canvas");

        this.height=this.stage.canvas.height;
        this.width=this.stage.canvas.width;
        Preloader.init();

    },
    setup:function(){
        Preloader.cleanup();
        Player=setupPlayer();
        this.levelData = Preloader.queue.getResult("levelData");
        var t = new SplashScene('Splash').addToStage(this.stage)
        this.currentScene=0;
        this.scenes.push(t)
        this.scenes.push(new MissionSelectScene(this.levelData));
        this.scenes.push(new StoreScene());
        this.scenes.push(new BattleScene());
        this.scenes.push(new VictoryScene());
        Controls.initialize();

        //TODO LosingScene, final victory
        createjs.Ticker.setFPS(30);
        createjs.Ticker.on('tick', Tick.tock);

    },
    clearScene:function(){
        this.stage.removeChild(this.scenes[this.currentScene]);
    },
    nextScene:function(e){

        console.log("Switching scene");
        this.clearScene();

        try {//Scene specific cleanup
            this.scenes[this.currentScene].close();
        } catch(e){
            console.log(this.scenes[this.currentScene].name+" has no close method")
        }

        this.currentScene++;
        this.stage.addChild(this.scenes[this.currentScene])
        try {
            this.scenes[this.currentScene].clear();
        } catch(e){
            console.log(this.scenes[this.currentScene].name+" has no clear method")
        }
        try {
            this.scenes[this.currentScene].setup();
        } catch(e) {
            console.log(this.scenes[this.currentScene].name+" has no setup method")
        }

    },
    missionSelected:function(e){//enter store
        this.currentMission = e.currentTarget.countryIndex;
        Player.cash+=this.levelData.levels[this.currentMission].reward;
        this.levelData.levels[this.currentMission].completed=true;
        Player.lives=100;
        this.nextScene();
        StoreScene.update();//Hack alert
    },
    startBattle:function(){
        this.nextScene();
        this.scenes[this.currentScene].setup(this.levelData.levels[this.currentMission]);
        this.inBattle=true;
        //console.log(this.levelData.levels[this.currentMission]);
    },

    setScene:function(scene){
        switch(scene){
            case "Mission Select":
                this.currentScene=0;//one less
                break;
        }
        //this.nextScene();
    }

};
Game.init();