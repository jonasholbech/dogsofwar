"use strict";
(function() {
    function BattleScene() {
        this.initialize();//
        this.enemies=[];
        this.playerBullets=[];
        this.enemyBullets=[];
        this.data=null;
        this.name="Battle";
        this.tickCounter=0;
        this.killCounter={};
        this.killCounter.foot=0;
        this.killCounter.tank=0;
        this.killCounter.helicopter=0;
    }
    BattleScene.prototype = new createjs.Container();
    //Save a reference to the parent constructor
    BattleScene.prototype.Parent_constructor = BattleScene.prototype.initialize;

    BattleScene.prototype.initialize=function(){
        //call parent constructor
        this.Parent_constructor();
        //continue with own constructor
        console.log("BS constructed");

    }
    BattleScene.prototype.setup=function(data){
        this.data=data;
        this.addChild(Player);
        Player.x=(Game.width/2)-Player.width/2;
        Player.y=Game.height-Player.height;
    }
    BattleScene.prototype.tick=function(){
        this.tickCounter++;
        if(this.tickCounter>this.data.duration && this.enemies.length==0 && this.enemyBullets.length==0){

            dirtyStorage.foot=this.killCounter.foot;
            dirtyStorage.tank=this.killCounter.tank;
            dirtyStorage.helicopter=this.killCounter.helicopter;
            this.cleanUp();
            Game.inBattle=false;
            Game.nextScene();

        } else  {
            if(this.tickCounter<this.data.duration){
                this.generateEnemies();
            }
            this.handleEnemies();
            this.handleBullets();
            this.detectCollisions();
        }

    }
    BattleScene.prototype.detectCollisions=function(){
        var i,e;
        for(i=this.playerBullets.length-1; i>=0; i--){
            for(e=this.enemies.length-1; e>=0; e--){
                if(Utils.hitTest(this.playerBullets[i], this.enemies[e])){
                    this.enemies[e].lives-=this.playerBullets[i].damage;
                    if(this.enemies[e].lives<1){
                        switch(this.enemies[e].type){
                            case "Foot Soldier":
                                this.killCounter.foot++;
                                break;
                            case "Tank":
                                this.killCounter.tank++;
                                break;
                            case "Helicopter":
                                this.killCounter.helicopter++;
                                break;
                        }
                        this.removeChild(this.enemies[e]);
                        this.enemies.splice(e,1);

                    }
                    this.removeChild(this.playerBullets[i]);
                    this.playerBullets.splice(i,1);
                    break;
                }

            }
        }
        for(i=this.enemyBullets.length-1; i>=0; i--){
            if(Utils.hitTest(this.enemyBullets[i], Player)){
                Player.lives-=this.enemyBullets[i].damage;
                this.removeChild(this.enemyBullets[i])
                this.enemyBullets.splice(i,1);
                if(Player.lives<1){
                    console.log("DEATH COMES TO ALL");
                    break;
                }
            }
        }
    }
    BattleScene.prototype.handleBullets=function(){
        var i;
        for(i=this.enemyBullets.length-1; i>=0; i--){
            this.enemyBullets[i].move();
            if(this.enemyBullets[i].distance<0 || this.enemyBullets[i].y>Game.height || this.enemyBullets[i].x>Game.height || this.enemyBullets[i].x<0){
                this.removeChild(this.enemyBullets[i]);
                this.enemyBullets.splice(i,1);
            }
        }
        for(i=this.playerBullets.length-1; i>=0; i--){
            this.playerBullets[i].move();
            if(this.playerBullets[i].distance<0 || this.playerBullets[i].y<0){//TODO kan ikke skyde skråt, kugler fjernes ikke der
                this.removeChild(this.playerBullets[i]);
                this.playerBullets.splice(i,1);
            }
        }
    }
    BattleScene.prototype.handleEnemies=function(){
        var i;

        for(i=this.enemies.length-1; i>=0; i--){
            this.enemies[i].tick();
            if(this.enemies[i].y>Game.height){
                this.removeChild(this.enemies[i]);
                this.enemies.splice(i,1);
                console.log("Num enemies", this.enemies.length);
            }
        }
    }
    BattleScene.prototype.addEnemy=function(type){
        switch(type){
            case "tank":
                this.enemies.push(new Tank(this, {}))
                break;
            case "helicopter":

                break;
            default:
                this.enemies.push(new Enemy(this,{}));
                //this.enemies.push(new Tank(this, {}))
                //console.log(this.enemies);
                break;
        }
    }
    /*
    this.parent = parent;
    this.path = def.path || "img/foot.png";
    this.range = def.range || 10;
    this.firingSpeed = def.firingSpeed || 60;
    this.damage = def.damage || 10;
    this.name = def.name || "Foot Soldier";
    this.fireCounter = def.fireCounter || this.firingSpeed;
    this.lives = def.lives || 10;
    this.width =def.width || 92;
    this.height = def.height || 107;
    this.deltaX = def.deltaX || 0;
    this.deltaY = def.deltaY || 1;
    */

    BattleScene.prototype.generateEnemies=function(){
        var r1=Utils.getRandomInt(1000);
        var r2=Utils.getRandomInt(1000);
        var r3=Utils.getRandomInt(1000);
        //console.log(this.data.spawns.foot)
        if(r1<this.data.spawns.foot){
            this.addEnemy();
            //console.log("Spawn foot");
        }
        if(r2<this.data.spawns.tank){
            this.addEnemy("tank");
            //console.log("Spawn tank");
        }
        if(r3<this.data.spawns.helicopter){
            this.addEnemy("helicopter");
            //console.log("Spawn helicopter");
        }
    }
    BattleScene.prototype.cleanUp=function(){
        this.enemies=[];
        this.playerBullets=[];
        this.enemyBullets=[];
        this.tickCounter=0;
        this.data=null;
        this.killCounter.foot=0;
        this.killCounter.tank=0;
        this.killCounter.helicopter=0;
        this.removeAllChildren();
        //TODO når der er text på, skal den nok loope og fjerne enemies etc
    }
    //add it to the global namespace
    window.BattleScene = BattleScene
}());