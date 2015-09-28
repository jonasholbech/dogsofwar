(function(){
    //TODO not used yet
    function TextDO(text, defaults){
        defaults = defaults || {};
        var color = defaults.color || "#fff";
        var font = defaults.font || "'Black Ops One'";
        var size = defaults.size || "18px";
        var x = defaults.x || 0;
        var y = defaults.x || 0;
        var textAlign = defaults.textAlign || "left";
        var textBaseline = defaults.textBaseline || "top";
        var my = new createjs.Text(text, size+" "+font, color);
        my.x=x;
        my.y=y;
        my.textAlign=textAlign;
        my.textBaseline=textBaseline;
        return my;
    }
    window.TextDO = TextDO;
}());