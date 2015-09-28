"use strict"
function MissionButton(text, e, customContext){
    var context = customContext || Game
    var my = new createjs.Container();
    var c = new createjs.Shape();
    c.graphics.beginFill("#F00").drawCircle(0,0,12);
    c.button = new createjs.Shape();
    c.button.graphics.beginFill("#000").drawRect(0,0,200,50)
    c.button.x=16;
    c.te = new createjs.Text(text, "18px 'Black Ops One'", "#fff")
    c.te.textAlign="center";
    c.te.textBaseline="middle";
    c.te.x=100+16;
    c.te.y=25;
    c.button.visible= c.te.visible=false;
    my.enabled=true;
    my.addChild(c, c.button, c.te)
    var listener = my.on("click", e, context);
    my.toggle=function(){
        if(my.enabled){
            my.enabled=false;
            c.color="#808080";
            c.te.color="#808080";
            my.off("click", listener);
        } else {
            my.enabled=true;
            listener = my.on("click", e, context);
        }
    }
    my.handleMouseEvent=function(evt) {
        if(evt.target.button) {
            if(evt.type=="mouseover") {
                evt.target.button.visible = true;
                evt.target.te.visible = true;
            } else if(evt.type=="mouseout"){
                evt.target.button.visible = false;
                evt.target.te.visible = false;
            }
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