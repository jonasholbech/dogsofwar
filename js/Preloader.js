"use strict";

var Preloader={
    queue:null,
    preloadText: new createjs.Text("LOADING...", "30px 'Black Ops One'", "#000"),
    init:function(){
        Preloader.queue = new createjs.LoadQueue();
        Preloader.queue.on('complete', Game.setup, Game);
        Preloader.queue.on('progress',Preloader.loadProgress);
        Preloader.queue.installPlugin(createjs.Sound);
        Preloader.queue.loadManifest([
            {src:"js/Utils.js"},
            {id:"levelData",src:"data/levels.json"},
            {src:"data/weapons.png"},
            {id:"weaponsSS", src:"data/weapons.json"},
            {id:"weaponData", src:"data/weaponData.json"},

            {src:"js/Player.js"},

            {src:"js/Button.js"},
            {src:"js/MissionButton.js"},
            {src:"js/Tick.js"},
            {src:"js/Bullet.js"},
            {src:"js/PlayerBullet.js"},
            {src:"js/Weapon.js"},
            {src:"js/Enemy.js"},

            {src:"js/TextDO.js"},


            {src:"js/Scenes/SplashScene.js"},
            {src:"js/Scenes/MissionSelectScene.js"},
            {src:"js/Scenes/StoreScene.js"},
            {src:"js/Scenes/BattleScene.js"},
            {src:"js/Scenes/VictoryScene.js"},

            {src:"js/Controls.js"},

            {src:"img/player.png"},
            {src:"img/foot1.png"},
            {src:"img/foot2.png"},
            {src:"img/foot3.png"},
            {src:"img/foot4.png"},
            {src:"img/foot5.png"},
            {src:"img/foot6.png"},
            {src:"img/tank1.png"},
            {src:"img/tank2.png"},
            {src:"img/tank3.png"},
            {src:"img/tank4.png"},
            {src:"img/splash.jpg"},
            {src:"img/European_map.png"},
            {src:"data/backgrounds.json", id:"bgJson"},
            {src:"data/backgrounds.png"}
        ]);


        Preloader.preloadText.baseLine="middle";
        Preloader.preloadText.textAlign="center";
        Preloader.preloadText.x=Game.width / 2;
        Preloader.preloadText.y=Game.height / 2;
        Game.stage.addChild(Preloader.preloadText);

    },
    loadProgress:function(e){
        var percent = Math.round(e.progress*100);
        Preloader.preloadText.text="LOADING... "+percent+"%";
        Game.stage.update();
    },
    cleanup:function(){
        Game.stage.removeChild(Preloader.preloadText);
    }
};


