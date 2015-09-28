function Weapon(ss,defaults){
    defaults=defaults || {}
    this.sprite = new createjs.Sprite(ss, defaults.sprite);
    this.range = defaults.range || 250;
    this.firingSpeed = defaults.firingSpeed || 30;
    this.damage = defaults.damage || 10;
    this.price = defaults.price || 400;
    this.name = defaults.name || "Generic Gun";
    this.ammoType = defaults.ammoType || "9mm";
    this.bulletSpeed = defaults.bulletSpeed || 4;

}