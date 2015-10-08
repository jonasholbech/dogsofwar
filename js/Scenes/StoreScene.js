var StoreScene = function (data) {

    var my, i;
    console.log("Scene Shop created");
    my = new createjs.Container();
    my.name='Shop';
    my.startEnabled=Player.weapons.length;
    StoreScene.cash = new createjs.Text("$"+Player.cash)
    my.addChild(StoreScene.cash)

    var ss = new createjs.SpriteSheet(Preloader.queue.getResult('weaponsSS'));
    var vd = Preloader.queue.getResult('weaponData');
    StoreScene.items=[];
    StoreScene.containers=[];
    for(i=0; i<vd.guns.length; i++){//skip the first
        StoreScene.items.push(new Weapon(ss, vd.guns[i]));
    }

    //12gauge not used, TODO
    StoreScene.ammoTypes={
        "9mm":{"price": 17, "inc":10},
        "12gauge":{"price": 25, "inc":6},
        ".357":{"price": 20, "inc": 8}
    }

    var xPos=200, yPos=100, tb, tc,ba, ammoInfo;
    for(i=0; i<StoreScene.items.length; i++){
        tc = new createjs.Container();
        StoreScene.items[i].sprite.scaleX=0.3;
        StoreScene.items[i].sprite.scaleY=0.3;
        tc.addChild(StoreScene.items[i].sprite);
        tc.weapon=StoreScene.items[i];
        tb=new Button("Buy: $"+StoreScene.items[i].price, StoreScene.buyItem)
        tc.addChild(tb);
        ammoInfo=StoreScene.ammoTypes[StoreScene.items[i].ammoType];
        ba=new Button(ammoInfo.inc+ " "+ StoreScene.items[i].ammoType+": $"+ammoInfo.price, StoreScene.buyAmmo)
        ba.ammoType=StoreScene.items[i].ammoType;
        tc.addChild(ba)
        tb.x=0;
        tb.y=0;
        ba.x=0;
        ba.y=300;
        tc.x=xPos;
        tc.y=yPos;
        StoreScene.items[i].sprite.y=100;
        my.addChild(tc);
        xPos+=850;
        StoreScene.containers.push(tc)
    }
    var lb, rb,start;
    lb=new Button("Prev", StoreScene.prev)
    rb=new Button("Next", StoreScene.next)
    start=new Button("Start Battle", Game.startBattle)

    lb.y=rb.y=180;
    rb.x=500;
    start.y=500;
    my.addChild(lb,rb, start)
    return my;
};
StoreScene.buyAmmo=function(e){
    //TODO check if player has cash, cross out bought weapons
    var ammoType=e.currentTarget.ammoType;
    var cost = StoreScene.ammoTypes[ammoType].price;
    var inc = StoreScene.ammoTypes[ammoType].inc;
    Player.cash-=cost;
    Player.ammo[ammoType]+=inc;
    StoreScene.cash.text="$"+Player.cash;
}
StoreScene.update=function(){//Player.cash is read once loaded, use this to update
    StoreScene.cash.text="$"+Player.cash;
    return this;
}
StoreScene.buyItem=function(e){
    var i;
    //TODO check if player has weapon, and cash
    Player.weapons.push(e.currentTarget.parent.weapon)
    Player.cash-= e.currentTarget.parent.weapon.price;
    StoreScene.cash.text="$"+Player.cash;
    //StoreScene.containers.removeChild(e.currentTarget.parent)
}
StoreScene.next=function(e){
    var i,newX;
    for(i=0; i<StoreScene.containers.length; i++){
        newX=StoreScene.containers[i].x-=850;
        createjs.Tween.get(StoreScene.containers[i]).to({x:newX}, 100)
        //TODO, tween not working
    }
}
StoreScene.prev=function(e){
    //TODO
    var i,newX;
    for(i=0; i<StoreScene.containers.length; i++){
        newX=StoreScene.containers[i].x+=850;
        createjs.Tween.get(StoreScene.containers[i]).to({x:newX}, 100)
        //TODO, tween not working
    }
}