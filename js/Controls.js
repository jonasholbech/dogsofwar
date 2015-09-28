var Controls ={
    lkd:false,
    rkd:false,
    ukd:false,
    dkd:false,
    skd:false,
    shift:false,
    charging:true,//an attempt to avoid multiple "hits"
    initialize:function(){
        window.onkeyup=this.keyUp;
        window.onkeydown=this.keyDown;
    },
    disable:function(){
        window.onkeyup=null;
        window.onkeydown=null;
    },
    keyUp:function(e){
        //console.log(e.keyCode);
        switch(e.keyCode){
            case 37:
                Controls.lkd=false;
                break;
            case 38:
                Controls.ukd=false;
                break;
            case 39:
                Controls.rkd=false;
                break;
            case 40:
                Controls.dkd=false;
                break;
            case 32:
                Controls.skd=false;
                break;
            case 16:
                Controls.shift=false;
                break;

        }
    },
    keyDown:function(e){
        switch(e.keyCode){
            case 37:
                Controls.lkd=true;
                break;
            case 38:
                Controls.ukd=true;
                break;
            case 39:
                Controls.rkd=true;
                break;
            case 40:
                Controls.dkd=true;
                break;
            case 32:
                Controls.skd=true;
                break;
            case 16:
                Controls.shift=true;
                Controls.charging=true;
                break;
        }
    }
}