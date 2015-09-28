"use strict"
function Button(text, e, customContext){
    var context = customContext || Game
    var my = new createjs.Container()
    var t = new createjs.Shape();
    t.graphics.beginFill("#000").drawRect(0,0,200,50)
    my.addChild(t)
    var te = new createjs.Text(text, "18px 'Black Ops One'", "#fff")
    te.textAlign="center";
    te.textBaseline="middle";
    te.x=100;
    te.y=25;
    my.enabled=true;
    my.addChild(te);
    var listener = my.on("click", e, context);
    my.toggle=function(){
        if(my.enabled){
            my.enabled=false;
            te.color="#808080";
            my.off("click", listener);
        } else {
            my.enabled=true;
            listener = my.on("click", e, context);
        }
    }
    return my;
    //TODO
    //set disabled (bought, completed not eligible etc)
    /*Button(text, cliked)
    -text
    -disabled
    onClick: callback
    setText: text
    setDisabled: Boolean*/
}