function calcAngleDegrees(x, y) {
  return Math.atan2(y, x) * 180 / Math.PI;
}
function _360(x, y){
    var d = calcAngleDegrees(x, y);
    if( d >= 0 ){
        return d;
    }else{
        return (360+d);
    }
}

$(function(){
  if (window.Worker) {
    log('Worker to work');
  }

    $(document).mousemove(function(event){
        window.mouseX =  event.pageX;
        window.mouseY =  event.pageY;

        window.unit1X = parseInt(   $('.unit1').css('left')  ) +(parseInt($('.unit1').css('width'))/2)     ;
        window.unit1Y = parseInt(   $('.unit1').css('top')   ) +(parseInt($('.unit1').css('height'))/2);

        var dstUnit1X = window.mouseX - window.unit1X;
        var dstUnit1Y = window.mouseY - window.unit1Y;

        var hypotenuse =  calcHypotenuse(dstUnit1X, dstUnit1Y) ;

        var vx = dstUnit1X / hypotenuse;
        var vy = dstUnit1Y / hypotenuse;

        $('.unit1').css('transform', 'rotate('+_360(dstUnit1X, dstUnit1Y)+'deg)');
    });
})
