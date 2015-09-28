"use strict";
(function() {//make sure variables aren't in the global name space (no pollution)
    function PlayerBullet(shooter, weapon) {
        this.shooter=shooter;
        this.distance=weapon.range;
        this.damage=weapon.damage;
        this.deltaY=-weapon.bulletSpeed;
        this.deltaX=shooter.deltaX || 0;
        this.initialize();
        this.graphics.beginFill("#000").drawCircle(0,0,2);
        this.x=this.shooter.x+this.shooter.width/2;//should subtract 1
        this.y=this.shooter.y;
        this.width=this.height=2;
        //this.regX=this.regY=1;

    }
    //The Monster IS a Shape
    PlayerBullet.prototype = new createjs.Shape();
    //Save a reference to the parent constructor
    PlayerBullet.prototype.Parent_constructor = PlayerBullet.prototype.initialize;

    PlayerBullet.prototype.initialize=function(){
        //call parent constructor
        //console.log(this.shooter);
        //this.Parent_constructor();//Skal af en eller anden grund ikke bruges?
        //continue with own constructor

    }
    PlayerBullet.prototype.move = function () {
        this.y+=this.deltaY;
        this.x+=this.deltaX;
        this.distance-=(this.deltaX+this.deltaY)*-1;
        //console.log(this.distance)
    }
    //add it to the global namespace
    window.PlayerBullet = PlayerBullet;
}());