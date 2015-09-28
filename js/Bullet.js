"use strict";
(function() {//make sure variables aren't in the global name space (no pollution)
    function Bullet(shooter) {
        this.shooter=shooter;
        this.distance=shooter.range;
        this.damage=shooter.damage;
        this.deltaX=3;
        this.deltaY=shooter.deltaY;
        this.initialize();
        this.graphics.beginFill("#F0F").drawCircle(0,0,2);
        this.x=this.shooter.x+this.shooter.width/2;//should subtract 1
        this.y=this.shooter.y+this.shooter.height;
        this.width=this.height=2;
        //this.regX=this.regY=1;

    }
    //The Monster IS a Shape
    Bullet.prototype = new createjs.Shape();
    //Save a reference to the parent constructor
    Bullet.prototype.Parent_constructor = Bullet.prototype.initialize;

    Bullet.prototype.initialize=function(){
        //call parent constructor
        //console.log(this.shooter);
        //this.Parent_constructor();//Skal af en eller anden grund ikke bruges?
        //continue with own constructor

    }
    Bullet.prototype.move = function () {
        this.y+=this.deltaY;
        this.y+=this.deltaX;
        this.distance-=(this.deltaX+this.deltaY);
        //console.log(this.distance)
    }
    //add it to the global namespace
    window.Bullet = Bullet;
}());