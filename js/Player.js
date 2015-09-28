"use strict"
var Player;
function setupPlayer(){
    var t= new createjs.Bitmap(Preloader.queue.getResult('img/player.png'));
    t.weapons=[];
    t.lives=100;
    t.score=0;
    t.cash=0;
    t.width=48;
    t.height=25;
    t.speed=3;
    t.fireCounter=0;
    t.ammo={
        "9mm":0,
        "12gauge":0,
        ".357":0
    };
    t.currentWeapon=0;

    t.tick=function(){
        t.fireCounter--;
        if(Controls.lkd){
            t.x-= t.speed;
        } else  if(Controls.rkd){
            t.x+= t.speed;
        }
        if(Controls.ukd){
            t.y-= t.speed;
        } else if (Controls.dkd){
            t.y+= t.speed;
        }
        if(Controls.skd){
            if(t.weapons[t.currentWeapon]){
                var w = t.weapons[t.currentWeapon];
                var shots = t.ammo[w.ammoType];
                if(shots > 0 && t.fireCounter<1){
                    t.ammo[w.ammoType]--;
                    t.fireCounter= w.firingSpeed;
                    var b=new PlayerBullet(t, t.weapons[t.currentWeapon])
                    Game.scenes[Game.currentScene].playerBullets.push(b)
                    Game.scenes[Game.currentScene].addChild(b)
                }

            }
        }
        if(!Controls.shift && Controls.charging==true){//TODO fix, it's buggy
            Controls.charging=false;
            t.currentWeapon++;
            if(t.currentWeapon>= t.weapons.length){
                t.currentWeapon=0;
            }
            console.log("Switched to "+t.weapons[t.currentWeapon].name)
        }
    }
    return t;
}