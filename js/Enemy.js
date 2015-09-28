"use strict";
(function() {//make sure variables aren't in the global name space (no pollution)
    function Enemy(parent, def) {
        def=def || {}
        this.parentContainer = parent;
        this.path = def.path || Preloader.queue.getResult("img/foot"+Utils.getRandomInt(1,6)+".png");
        this.range = def.range || 300;
        this.firingSpeed = def.firingSpeed || 60;
        this.damage = def.damage || 10;
        this.type = def.type || "Foot Soldier";
        this.fireCounter = def.fireCounter || this.firingSpeed;
        this.lives = def.lives || 10;
        this.width =def.width || 28;
        this.height = def.height || 28;
        this.deltaX = def.deltaX || 0;
        this.deltaY = def.deltaY || 1;

        this.initialize();

        this.x=def.x || Utils.getRandomInt(0, 770);
        this.y=def.y || Utils.getRandomInt(107, 200)*-1;
    }
    //The Monster IS a Bitmap
    Enemy.prototype = new createjs.Bitmap();
    //Save a reference to the parent constructor
    Enemy.prototype.Parent_constructor = Enemy.prototype.initialize;

    Enemy.prototype.initialize=function(){
        //call parent constructor
        this.Parent_constructor(this.path);
        this.parentContainer.addChild(this)
    }
    Enemy.prototype.tick=function(){
        this.move();
        this.attack();
    }
    Enemy.prototype.attack=function(){
        if(this.fireCounter>0){
            //we don't care if it goes below zero
            this.fireCounter--;
            return false;
        } else {
            this.fireCounter=this.firingSpeed;
            var t = new Bullet(this);
            this.parentContainer.enemyBullets.push(t);
            this.parentContainer.addChild(t);
            return true;
        }
    }
    Enemy.prototype.move = function(){
        this.x+=this.deltaX;
        this.y+=this.deltaY;
    }

    //add it to the global namespace
    window.Enemy = Enemy;

    /*EXTENDING 3,2,1, GO*/

    function Tank(parent, def) {
        // Call the parent constructor, making sure (using Function#call)
        // that "this" is set correctly during the call
        def=def || {}
        var o={};
        o.path = def.path || Preloader.queue.getResult("img/tank"+Utils.getRandomInt(1,4)+".png");
        o.range = def.range || 700;
        o.firingSpeed = def.firingSpeed || 120;
        o.damage = def.damage || 100;
        o.type = def.type || "Tank";
        o.fireCounter = def.fireCounter || o.firingSpeed;
        o.lives = def.lives || 100;
        o.width =def.width || 48;
        o.height = def.height || 77;
        o.deltaX = def.deltaX || 0;
        o.deltaY = def.deltaY || 1.5;
        Enemy.call(this,parent, o);

    };

// Create a Student.prototype object that inherits from Person.prototype.
// Note: A common error here is to use "new Person()" to create the
// Student.prototype. That's incorrect for several reasons, not least
// that we don't have anything to give Person for the "firstName"
// argument. The correct place to call Person is above, where we call
// it from Student.
    Tank.prototype = Object.create(Enemy.prototype); // See note below

// Set the "constructor" property to refer to Student
    Tank.prototype.constructor = Tank;

    window.Tank=Tank;


}());
