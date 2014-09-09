function eventmanger(){
    this.events={};
    if (window.navigator.msPointerEnabled) {
        //Internet Explorer 10 style
        this.eventTouchstart    = "MSPointerDown";
        this.eventTouchmove     = "MSPointerMove";
        this.eventTouchend      = "MSPointerUp";
    } else {
        this.eventTouchstart    = "touchstart";
        this.eventTouchmove     = "touchmove";
        this.eventTouchend      = "touchend";
    }
    this.listent();
}
eventmanger.prototype.on = function(name, callback){
    if(!this.events[name]){
        this.events[name] = [];
    }
    if(callback){
        this.events[name].push(callback);
    }
}
eventmanger.prototype.emit = function(name, data){
    if(this.events[name]){
        this.events[name].forEach(function(callback){
            callback(data);
        });
    }
}
eventmanger.prototype.listent = function(){
    var self = this;

    self.startX = 0;
    self.startY = 0;
    window.contain.addEventListener(this.eventTouchstart, function(e){
        e.preventDefault();
        e.stopPropagation();
        self.startX = e.touches[0].clientX;
        self.startY = e.touches[0].clientY;

        console.log(self.startX);
        console.log("_"+self.startY);
    },false);
    window.contain.addEventListener(this.eventTouchmove, function(e){
        e.preventDefault();
       //e.stopPropagation();

    },false);
    window.contain.addEventListener(this.eventTouchend, function(e){
    //    e.preventDefault();
     //   e.stopPropagation();
        var curentX = e.changedTouches[0].clientX, curentY = e.changedTouches[0].clientY;
        var dx = curentX - self.startX, dy = curentY - self.startY, absX = Math.abs(dx), absY = Math.abs(dy);
        if(Math.max(absX,absY)>10){
            self.emit("move",absX > absY?(dx>0?"right":"left"):(dy>0?"down":"up"));
        }
    },false);
}